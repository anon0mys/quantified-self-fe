const baseURL = require('./qsAPI').baseURL()

const recipesAPIFetch = (id, method, body) => {
  return fetch(`${baseURL}/api/v1/foods/${id}/recipes`, {
    method: `${method}`,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
}

const getRecipes = (id) => {
  recipesAPIFetch(id, 'GET')
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
