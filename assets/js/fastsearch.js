import * as params from '@params';

const resList = document.getElementById('searchResults');
const sInput = document.getElementById('searchInput');
const searchBox = document.getElementById('searchbox');
const statusRow = document.getElementById('searchStatus');
const countEl = document.getElementById('searchCount');
const rankNote = document.getElementById('searchRankNote');
const ruleEl = document.getElementById('searchRule');
const emptyMsg = document.getElementById('searchEmptyMsg');

let fuse;

const defaultFuseOptions = {
    distance: 60,
    threshold: 0.25,
    ignoreLocation: true,
    includeMatches: true,
    minMatchCharLength: 2,
    keys: ['title', 'summary', 'tags']
};

const buildFuseOptions = () => {
    if (!params.fuseOpts) {
        return defaultFuseOptions;
    }

    return {
        isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
        includeScore: params.fuseOpts.includescore ?? false,
        includeMatches: true,
        minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
        shouldSort: params.fuseOpts.shouldsort ?? true,
        findAllMatches: params.fuseOpts.findallmatches ?? false,
        keys: params.fuseOpts.keys ?? defaultFuseOptions.keys,
        location: params.fuseOpts.location ?? 0,
        threshold: params.fuseOpts.threshold ?? defaultFuseOptions.threshold,
        distance: params.fuseOpts.distance ?? defaultFuseOptions.distance,
        ignoreLocation: params.fuseOpts.ignorelocation ?? defaultFuseOptions.ignoreLocation
    };
};

const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => fn(...args), delay);
    };
};

// Splits `text` into a fragment of plain text nodes plus <mark> nodes for each
// Fuse match range, so highlighting never touches innerHTML with user input.
const highlighted = (text, match) => {
    const frag = document.createDocumentFragment();
    const indices = match && match.indices;

    if (!indices || !indices.length) {
        frag.appendChild(document.createTextNode(text));
        return frag;
    }

    let cursor = 0;
    for (const [start, end] of indices) {
        if (start > cursor) {
            frag.appendChild(document.createTextNode(text.slice(cursor, start)));
        }
        const mark = document.createElement('mark');
        mark.textContent = text.slice(start, end + 1);
        frag.appendChild(mark);
        cursor = Math.max(cursor, end + 1);
    }
    if (cursor < text.length) {
        frag.appendChild(document.createTextNode(text.slice(cursor)));
    }
    return frag;
};

const matchFor = (matches, key) => matches && matches.find((m) => m.key === key);

const formatCount = (n) => `${n} result${n === 1 ? '' : 's'}`;

const renderResults = (results) => {
    resList.innerHTML = '';

    if (!results.length) {
        return;
    }

    const fragment = document.createDocumentFragment();

    for (const result of results) {
        const item = result.item;

        const li = document.createElement('li');

        const link = document.createElement('a');
        link.className = 'nb-post-row';
        link.href = item.permalink;

        const dateSpan = document.createElement('span');
        dateSpan.className = 'nb-post-date';
        dateSpan.textContent = item.date;

        const body = document.createElement('span');

        const titleSpan = document.createElement('span');
        titleSpan.className = 'nb-post-title';
        titleSpan.appendChild(highlighted(item.title, matchFor(result.matches, 'title')));

        const descSpan = document.createElement('span');
        descSpan.className = 'nb-post-desc';
        descSpan.appendChild(highlighted(item.summary, matchFor(result.matches, 'summary')));

        body.appendChild(titleSpan);
        body.appendChild(descSpan);

        if (Array.isArray(item.tags) && item.tags.length) {
            const tagRow = document.createElement('span');
            tagRow.className = 'nb-search-tags';
            for (const tag of item.tags) {
                const tagEl = document.createElement('span');
                tagEl.className = 'tag tag-neutral';
                tagEl.textContent = tag;
                tagRow.appendChild(tagEl);
            }
            body.appendChild(tagRow);
        }

        link.appendChild(dateSpan);
        link.appendChild(body);
        li.appendChild(link);
        fragment.appendChild(li);
    }

    resList.appendChild(fragment);
};

const setEmptyMessage = (query) => {
    emptyMsg.textContent = '';
    emptyMsg.appendChild(document.createTextNode('Nothing in the index matches '));
    const em = document.createElement('em');
    em.textContent = query;
    emptyMsg.appendChild(em);
    emptyMsg.appendChild(document.createTextNode('. The index covers titles, summaries and topics — try a shorter word, or browse '));
    const link = document.createElement('a');
    link.href = '/archive/';
    link.textContent = 'the archive by year';
    emptyMsg.appendChild(link);
    emptyMsg.appendChild(document.createTextNode('.'));
};

const setStatus = (state, query, count) => {
    if (state === 'idle') {
        statusRow.hidden = true;
        ruleEl.hidden = true;
        emptyMsg.hidden = true;
        return;
    }

    if (state === 'empty') {
        statusRow.hidden = false;
        ruleEl.hidden = false;
        rankNote.hidden = true;
        countEl.textContent = 'No results';
        emptyMsg.hidden = false;
        setEmptyMessage(query);
        return;
    }

    statusRow.hidden = false;
    ruleEl.hidden = false;
    rankNote.hidden = false;
    countEl.textContent = formatCount(count);
    emptyMsg.hidden = true;
};

const performSearch = () => {
    if (!fuse) {
        return;
    }

    const query = sInput.value.trim();
    if (!query) {
        renderResults([]);
        setStatus('idle');
        return;
    }

    const searchOptions = params.fuseOpts?.limit ? { limit: params.fuseOpts.limit } : undefined;
    let results = searchOptions ? fuse.search(query, searchOptions) : fuse.search(query);

    // Fuse already sorts by score (best match first); break ties by newest first.
    results = [...results].sort((a, b) => (a.score - b.score) || ((b.item.timestamp || 0) - (a.item.timestamp || 0)));

    renderResults(results);
    setStatus(results.length ? 'results' : 'empty', query, results.length);
};

const initSearch = async () => {
    if (!sInput || !resList) {
        return;
    }

    try {
        const response = await fetch('../index.json');
        if (!response.ok) {
            throw new Error(`Search index load failed: ${response.status}`);
        }

        const data = await response.json();
        if (data) {
            fuse = new Fuse(data, buildFuseOptions());
        }
    } catch (error) {
        console.error(error);
    } finally {
        sInput.disabled = false;
    }
};

window.addEventListener('load', initSearch);

sInput?.addEventListener('input', debounce(performSearch, 150));

sInput?.addEventListener('search', () => {
    if (!sInput.value) {
        renderResults([]);
        setStatus('idle');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && searchBox?.contains(document.activeElement)) {
        sInput.value = '';
        renderResults([]);
        setStatus('idle');
    }
});
