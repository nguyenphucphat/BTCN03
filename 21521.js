const fs = require('fs').promises; // Sử dụng Promise để đọc file một cách bất đồng bộ
const path = require('path');

const movieTemplate = path.join(__dirname, 'src', 'views','component', 'movie-card.html');
const reviewTemplate = path.join(__dirname, 'src', 'views','component', 'review-card.html');
const reviewListTemplate = path.join(__dirname, 'src', 'views','component', 'listReview.html');
const movieDetailTemplate = path.join(__dirname, 'src', 'views','component', 'movieDetail.html');
const movieListTemplate = path.join(__dirname, 'src', 'views','component', 'listMovie.html');
const nameTemplate = path.join(__dirname, 'src', 'views','component', 'name-card.html');

const listMovie =  fs.readFile( movieListTemplate  , 'utf8');
const movie =  fs.readFile(movieTemplate, 'utf8');
const review =  fs.readFile(reviewTemplate, 'utf8');
const reviewList =  fs.readFile(reviewListTemplate, 'utf8');
const movieDetail =  fs.readFile(movieDetailTemplate, 'utf8');
const name =  fs.readFile(nameTemplate, 'utf8');

const templates = {
    listMovie,
    movie,
    review,
    reviewList,
    movieDetail,
    name
}

function evaluateExpression(expr, data) {
  try {
    const func = new Function(...Object.keys(data), `return ${expr};`);
    return func(...Object.values(data));
  } catch (e) {
    console.error("Error evaluating expression:", expr, e);
    return null;
  }
}

function renderInclude(template, data) {
    return template.replace(/21521\{\+ '(\w+)' with (\w+) \}/g, (match, partialName, variableName) => {
        if(template[partialName]) {
            if(partialName === 'listMovie') {
                return renderTemplate(templates[partialName], data[movies]);
            }
            if(partialName === 'movie') {
                return renderTemplate(templates[partialName], data[movie]);
            }
            if(partialName === 'review') {
                return renderTemplate(templates[partialName], data[review]);
            }
            if(partialName === 'reviewList') {
                return renderTemplate(templates[partialName], data[reviewList]);
            }
            if(partialName === 'movieDetail') {
                return renderTemplate(templates[partialName], data[movieDetail]);
            }
            if(partialName === 'name') {
                return renderTemplate(templates[partialName], data[name]);
            }
        }
    });
  }
  
function includePartials(template, data) {
  return template.replace(/21521\{\+ (\w+) \}/g, (match, partialName) => {
    const partialPath = path.join(__dirname, `${partialName}.html`);
    try {
      let partialTemplate = fs.readFileSync(partialPath, 'utf8');
      return renderTemplate(partialTemplate, data);
    } catch (error) {
      return `<!-- Partial ${partialName} not found -->`;
    }
  });
}

function renderConditional(template, data) {
  return template.replace(/21521\{if ([^}]+)\}([\s\S]*?)(\{else\}([\s\S]*?))?{\/if}/g, (match, condition, ifContent, _, elseContent) => {
    const result = evaluateExpression(condition, data);
    return result ? ifContent.trim() : (elseContent || '').trim();
  });
}

function renderLoop(template, data) {
  return template.replace(/21521\{for (\w+) in (\w+)\}([\s\S]*?){\/for}/g, (match, variable, array, loopContent) => {
    const items = data[array] || [];
    return items.map(item => {
      let loopData = {...data, [variable]: item};
      return renderTemplate(loopContent, loopData);
    }).join('');
  });
}

function renderExpression(template, data) {
  return template.replace(/21521\{([^}]+)\}/g, (match, expr) => {
    return evaluateExpression(expr, data);
  });
}

async function readFileAsync(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        throw new Error('Error reading file: ' + error.message);
    }
}


async function renderTemplate(template, data) {

    if (typeof template === 'string' && template.endsWith('layout.html')) {
        template = await readFileAsync(template);
    }

  // Include partials
  template = includePartials(template, data);

  
  template = renderInclude(template, data);

  // Process loops
  template = renderLoop(template, data);

  // Process conditional statements
  template = renderConditional(template, data);

  // Process expressions and variables
  template = renderExpression(template, data);

  return template;
}

module.exports = renderTemplate;