class ReadMore extends HTMLElement {
  constructor() {
    super();

    const self = this;
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
          self.handleStateChange();
        }
        return true;
      },
    });
  }

  connectedCallback() {
    this.initialMarkup = this.innerHTML;
    this.innerHTML = `
      ${this.initialMarkup}
      <button class="read-more__button">More [+]</button>
    `;

    this.postRender();
  }
  postRender() {
    this.readMoreButton = this.querySelector(".read-more__button");
    this.addEventListener("click", (e) => {
      if (![...e.target.classList].includes("read-more__button")) return;
      this.state.expanded = !this.state.expanded;
    });
  }
  handleStateChange() {
    const isExpanded = this.state.expanded;
    if (isExpanded) {
      this.readMoreButton.textContent = "Less [-]";
      this.classList.add("expanded");
    } else {
      this.readMoreButton.textContent = "More [+]";
      this.classList.remove("expanded");
    }
  }
}

if ("customElements" in window) {
  customElements.define("read-more", ReadMore);
}

export default ReadMore;
