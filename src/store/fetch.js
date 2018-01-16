const stream = weex.requireModule('stream')
// const baseURL = 'https://hacker-news.firebaseio.com/v0'
const baseURL = 'https://cms.aqumon.com/api/blog_all?language=zh_cn'

export function fetch (path) {
  return new Promise((resolve, reject) => {
    stream.fetch({
      method: 'GET',
      url: `${baseURL}`,
      type: 'json'
    }, (response) => {
      debugger;
      if (response.status == 200) {
        resolve(response.data)
      }
      else {
        reject(response)
      }
    }, () => {})
  })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
