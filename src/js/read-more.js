class ReadMore extends HTMLElement {
  constructor() {
    super();

    const self = this;

    if (!document.querySelector("#read-more-styles")) {
      // If load the styles via an external stylesheet, we can't reliably get the clientHeight/scrollHeight of the paragraphs, which makes it difficult to know whether we should add the More/Less button.
      const styles = `
      <style id="read-more-styles">
        read-more {
          display: block;
        }
        read-more .read-more__button {
          --flow-space: var(--s-1);
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          font-weight: bold;
          padding-left: 0;
          padding-right: 0;
          position: relative;
          text-decoration: underline;
        }
        read-more:not(.expanded) *:first-child {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
        read-more:not(.expanded) * + *:not(.read-more__button) {
          display: none;
        }
      </style>`;
      document.head.insertAdjacentHTML("beforeend", styles);
    }
    const initialState = {
      expanded: false,
    };

    this.state = new Proxy(initialState, {
      get(state, key) {
        if (!arguments.length) {
          return state;
        }
        return state[key];
      },
      set(state, key, value) {
        if (!key in state) return false;

        const oldValue = state[key];
        state[key] = value;

        if (oldValue !== value) {
          self.handleStateChange(key, value);
        }
        return true;
      },
    });
  }

  connectedCallback() {
    this.render();
  }

  getButtonText() {
    return this.state.expanded ? "Less [-]" : "More [+]";
  }

  render() {
    let renderedHtml = this.innerHTML;
    // If the scrollHeight of the first paragraph is greater than the clientHeight (the line-clamped height), show the button.
    const hasButton =
      this.children[0]?.scrollHeight > this.children[0]?.clientHeight;
    if (hasButton) {
      renderedHtml = `${renderedHtml}<button class="read-more__button">${this.getButtonText()}</button>`;
    }
    this.innerHTML = renderedHtml;
    this.postRender();
  }

  postRender() {
    this.readMoreButton = this.querySelector(".read-more__button");
    this.addEventListener("click", (e) => {
      if (![...e.target.classList].includes("read-more__button")) return;
      this.state.expanded = !this.state.expanded;
    });
  }

  handleStateChange(key, val) {
    switch (key) {
      case "expanded":
        if (this.state.expanded) {
          this.classList.add("expanded");
        } else {
          this.classList.remove("expanded");
        }
        this.readMoreButton.textContent = this.getButtonText();
        break;
      default:
        return;
    }
  }
}

if ("customElements" in window) {
  customElements.define("read-more", ReadMore);
}

export default ReadMore;
