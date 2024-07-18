class FetchAlertToast extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.render()
  }
  attributeChangedCallback = () => this.render()
  static get observedAttributes () {
    return ['content']
  }
  render = () => {
    const toastBox = document.createElement('div')
    const contentBox = document.createElement('div')
    contentBox.innerText = this.getAttribute('content')
    toastBox.appendChild(contentBox)
    this.shadowRoot.appendChild(toastBox)
  }
}

const fetchData = () => {
  fetch('/api')
    .then(res => {
      if (!res.ok)
        throw new Error(`${res.status}`)
      return res.json()
    })
    .then(data => {
      const newToast = document.createElement('fetch-alert-toast')
      newToast.setAttribute('content', data.detail)
      document.body.appendChild(newToast)
    })
}

const onPageLoad = () => {
  customElements.define('fetch-alert-toast', FetchAlertToast)
  fetchData()
  fetchDataWithParams({
    username: 'awesome user'
  })
  fetchDataWithParams({
    user: 'awesome user'
  })
}

const fetchDataWithParams = (params) => {
  fetch('/api/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
    .then(res => {
      if (!res.ok) {
        res.json()
          .then(data => {
            const newToast = document.createElement('fetch-alert-toast')
            newToast.setAttribute('content', 'Error!: ' + data.detail)
            document.body.appendChild(newToast)
          })
        throw new Error(`${res.status}`)
      }
      return res.json()
    })
    .then(data => {
      const newToast = document.createElement('fetch-alert-toast')
      newToast.setAttribute('content', data.detail)
      document.body.appendChild(newToast)
    })
}

onPageLoad()
