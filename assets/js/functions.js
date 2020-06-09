function setVisibleHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
function setSidebarContentHeight() {
  const breakpoint = window.matchMedia("(max-width: 575px)");
  const sidebarElement = document.querySelector(".m-sidebar");
  const summaryElement = document.querySelector(".m-sidebar .m-summary");

  if (summaryElement) {
    if (breakpoint.matches) {
      summaryElement.setAttribute(
        "style",
        `height: ${sidebarElement.offsetHeight}px`
      );
    } else {
      summaryElement.setAttribute("style", "height: auto");
    }
  }
}
function setPageHeight() {
  if(document.querySelector('.m-step__container')) {
    const sidebarElement = document.querySelector(".m-sidebar");
    const page = document.querySelector('.m-step__container');

    if(sidebarElement) {
      const pageHeight = document.querySelector('.m-step__container .row').clientHeight + 120;
      const sidebarHeight = document.querySelector('.m-sidebar .m-summary-wrapper').clientHeight;
      if(sidebarHeight > pageHeight) {
        page.setAttribute("style", `height: ${sidebarHeight}px`);
      } else {
        page.setAttribute("style", `height: ${pageHeight}px`);
      }
    }
  }
}

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

let setPageAndSidebarHeights = function setPageAndSidebarHeights() {
  docReady(function() {
    setVisibleHeight();
    setSidebarContentHeight();
    setPageHeight();
    window.onresize = function() {
      setVisibleHeight();
      setSidebarContentHeight();
      setPageHeight();
    };
  });
}

export default setPageAndSidebarHeights;