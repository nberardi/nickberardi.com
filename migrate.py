#!/usr/bin/env python3
"""
Ghost 0.5.7 to Hugo Migration Script
Converts Ghost JSON export to Hugo-compatible markdown files
"""

import json
import os
import re
from datetime import datetime
from pathlib import Path
import html

try:
    from markdownify import markdownify as md
except ImportError:
    print("Installing markdownify...")
    os.system("pip3 install markdownify")
    from markdownify import markdownify as md


IMAGE_PREFIX = '/images/'

def clean_html_entities(text):
    """Decode HTML entities"""
    if not text:
        return ""
    return html.unescape(text)


def convert_image_paths(content):
    """Convert Ghost image paths to Hugo static paths"""
    # Normalize all legacy URLs to /images/
    content = re.sub(r'https?://[^/]+/content/images/', '/images/', content)
    content = re.sub(r'/content/images/', '/images/', content)
    content = re.sub(r'https?://(?:www\.)?coderjournal\.com/(?:uploads|archives)/', '/images/', content)
    content = re.sub(r'/nickberardi\.com/images/', '/images/', content)
    content = re.sub(r'src="images/', 'src="/images/', content)
    content = re.sub(r'src="//[^/]+/uploads/', 'src="/images/', content)
    # Apply the current repo prefix
    content = content.replace('/images/', IMAGE_PREFIX)
    return content
def html_to_markdown(html_content):
    """Convert HTML to Markdown"""
    if not html_content:
        return ""
    
    # Fix image paths before conversion
    html_content = convert_image_paths(html_content)
    
    # Convert to markdown
    markdown = md(html_content, heading_style="ATX", bullets="-")
    
    # Clean up excessive newlines
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    
    return markdown.strip()


def get_description(post):
    """Get description from meta_description or extract from content"""
    if post.get('meta_description'):
        return clean_html_entities(post['meta_description'])
    
    # Extract first ~155 chars from HTML content
    html_content = post.get('html', '')
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', html_content)
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    # Truncate to ~155 chars at word boundary
    if len(text) > 155:
        text = text[:155].rsplit(' ', 1)[0] + '...'
    return text


def epoch_ms_to_iso(epoch_ms):
    """Convert epoch milliseconds to ISO 8601 date"""
    if not epoch_ms:
        return datetime.now().isoformat()
    return datetime.fromtimestamp(epoch_ms / 1000.0).strftime('%Y-%m-%dT%H:%M:%S-05:00')


def create_hugo_post(post, tags_dict, post_tags_map, output_dir):
    """Create a Hugo markdown file from a Ghost post"""
    
    # Skip drafts
    if post.get('status') != 'published':
        return False, f"Skipped draft: {post['title']}"
    
    # Get post tags
    post_id = post['id']
    tag_ids = post_tags_map.get(post_id, [])
    post_tags = [tags_dict.get(tag_id) for tag_id in tag_ids if tags_dict.get(tag_id)]
    
    # Create front matter
    title = clean_html_entities(post['title'])
    # Escape quotes in title
    safe_title = title.replace('"', '\\"')
    date = epoch_ms_to_iso(post.get('published_at') or post.get('created_at'))
    slug = post['slug']
    description = get_description(post)
    
    front_matter = f"""---
title: "{safe_title}"
date: {date}
slug: "{slug}"
draft: false
"""
    
    if post_tags:
        front_matter += "tags:\n"
        for tag in post_tags:
            # Escape quotes in tags
            safe_tag = tag.replace('"', '\\"')
            front_matter += f"  - \"{safe_tag}\"\n"
    
    if description:
        # Escape quotes and newlines in description
        safe_description = description.replace('"', '\\"').replace('\n', ' ')
        front_matter += f'description: "{safe_description}"\n'
    
    front_matter += "---\n\n"
    
    # Convert HTML to Markdown
    content = html_to_markdown(post.get('html', ''))
    
    # Create post directory
    post_dir = output_dir / slug
    post_dir.mkdir(parents=True, exist_ok=True)
    
    # Write markdown file
    post_file = post_dir / "index.md"
    with open(post_file, 'w', encoding='utf-8') as f:
        f.write(front_matter)
        f.write(content)
    
    return True, f"Converted: {title}"


def main():
    # Paths
    ghost_json = Path("/Users/nick/Desktop/content/data/nick-berardi.ghost.2015-01-05.json")
    output_dir = Path("/Users/nick/.openclaw/workspace/nickberardi.com/content/posts")
    
    # Load Ghost export
    print(f"Loading Ghost export from {ghost_json}...")
    with open(ghost_json, 'r', encoding='utf-8') as f:
        ghost_data = json.load(f)
    
    # Extract data
    data = ghost_data['data']
    posts = data['posts']
    tags = data['tags']
    posts_tags = data.get('posts_tags', [])
    
    # Build tags dictionary (id -> name)
    tags_dict = {tag['id']: clean_html_entities(tag['name']) for tag in tags}
    
    # Build post-tags mapping (post_id -> [tag_ids])
    post_tags_map = {}
    for pt in posts_tags:
        post_id = pt['post_id']
        tag_id = pt['tag_id']
        if post_id not in post_tags_map:
            post_tags_map[post_id] = []
        post_tags_map[post_id].append(tag_id)
    
    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Convert posts
    print(f"\nConverting {len(posts)} posts...")
    converted = 0
    errors = []
    
    for post in posts:
        try:
            success, message = create_hugo_post(post, tags_dict, post_tags_map, output_dir)
            if success:
                converted += 1
                print(f"✓ {message}")
            else:
                print(f"○ {message}")
        except Exception as e:
            error_msg = f"Error converting '{post.get('title', 'Unknown')}': {str(e)}"
            errors.append(error_msg)
            print(f"✗ {error_msg}")
    
    # Summary
    print(f"\n{'='*60}")
    print(f"Migration Summary:")
    print(f"  Total posts in export: {len(posts)}")
    print(f"  Successfully converted: {converted}")
    print(f"  Errors: {len(errors)}")
    print(f"  Total tags: {len(tags)}")
    print(f"{'='*60}")
    
    if errors:
        print("\nErrors:")
        for error in errors:
            print(f"  - {error}")
    
    return converted, errors


if __name__ == "__main__":
    converted, errors = main()
    exit(0 if not errors else 1)
