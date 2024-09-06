chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkForPullRequests") {
      chrome.storage.sync.get(['username'], function(result) {
        const username = result.username || 'NisanthanNanthakumar';
        const repoNav = document.querySelector('nav[aria-label="Repository"]');
        if (repoNav) {
          const navList = repoNav.querySelector('ul[data-view-component="true"]');
          if (navList) {
            addTab(navList, 'My Pull Requests', `https://github.com/indie-technologies/found/pulls/${username}`, 'my-pull-requests');
            addTab(navList, 'To Review', `https://github.com/indie-technologies/found/pulls/review-requested/@me`, 'to-review');
          }
        }
      });
    }
  });
  
  function addTab(navList, text, href, dataTabItem) {
    const existingTab = navList.querySelector(`li[data-tab-item="${dataTabItem}"]`);
    if (!existingTab) {
      const newTab = document.createElement('li');
      newTab.className = 'hx_reponav-item';
      newTab.setAttribute('data-tab-item', dataTabItem);
      
      const link = document.createElement('a');
      link.href = href;
      link.className = 'js-selected-navigation-item UnderlineNav-item hx_underlinenav-item no-wrap js-responsive-underlinenav-item';
      link.setAttribute('data-hotkey', `g ${dataTabItem.charAt(0)}`);
      link.setAttribute('data-selected-links', `repo_${dataTabItem.replace('-', '_')} /${dataTabItem}`);
      link.setAttribute('data-tab-item', dataTabItem);
      
      const span = document.createElement('span');
      span.textContent = text;
      link.appendChild(span);
      
      newTab.appendChild(link);
      navList.appendChild(newTab);
    }
  }