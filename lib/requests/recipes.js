const baseURL = require('./qsAPI').baseURL()

const recipesAPIFetch = (id, method, start = 1) => {
  return fetch(`${baseURL}/api/v1/foods/${id}/recipes?max=10&start=${start}`, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'}
  })
}

const getRecipes = (id, start = 1) => {
  recipesAPIFetch(id, 'GET', start)
  .then(response => handleResponse(response))
  .then(data => renderEachRecipe(data.recipes))
  .catch(error => console.error({ error }))
}

const renderEachRecipe = (recipes) => {
  return recipes.forEach(recipe => {
    renderRecipe(recipe)
  })
}

const renderRecipe = (recipe) => {
  $('.recipe-list').append(
    `<li><a href="${recipe.url}">${recipe.name}</a></li>`
  )
}

const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusTest: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
}

module.exports = { getRecipes, recipesAPIFetch }
