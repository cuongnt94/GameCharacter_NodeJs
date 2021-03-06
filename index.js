const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');


// parse from String to Object when getting data from the Server
const heroData = JSON.parse(json);

const server = http.createServer((req, res) => {
    
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    
    // OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
            
                const cardsOutput = heroData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput); 
                
                res.end(overviewOutput);
            });
        });
    }
    
    // Hero DETAIL
    else if (pathName === '/laptop' && id < heroData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-hero.html`, 'utf-8', (err, data) => {
            const laptop = heroData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    }
    
    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg'});
            res.end(data);
        });
    }
    
    // URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL was not found on the server!');
    }
    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%HERONAME%}/g, laptop.heroName);
    output = output.replace(/{%IMAGE%}/g, laptop.image); 
    output = output.replace(/{%POPULARITY%}/g, laptop.popularity); 
    output = output.replace(/{%INTEL%}/g, laptop.intel); 
    output = output.replace(/{%HP%}/g, laptop.hp); 
    output = output.replace(/{%AGI%}/g, laptop.agi); 
    output = output.replace(/{%STR%}/g, laptop.str); 
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    output = output.replace(/{%MAIN%}/g, laptop.main);
    return output;
}