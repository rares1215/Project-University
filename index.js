// Importarea pachetelor Express și EJS
const express = require('express');
const app = express();
const fs = require('fs');

// Citim configurația pentru erori din fișierul JSON
const configurareErori = JSON.parse(fs.readFileSync('erori.json'));

// Setarea motorului de template EJS
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.use('/resurse', express.static(__dirname + '/resurse'));


//  Rute specifice.
app.get(['/', "/index", "/home"], (req, res) => {
    res.render('pagini/index', {
        title: 'Vikings Bakery',
        dirname: __dirname,
        filename: __filename,
        cwd: process.cwd()
    });
});

//  Corectarea rutei pentru Cofetărie
app.get("/cofetarie", (req, res) => {
    res.render("pagini/cofetarie", {
        title: "Cofetărie!"
    });
});

app.get('/restricted', (req, res) => {
    const eroare403 = configurareErori.info_erori.find(e => e.identificator === 403);
    res.status(403).render('erori/eroare', {
        titlu: eroare403.titlu,
        text: eroare403.text,
        imagine: configurareErori.cale_baza + eroare403.imagine
    });
});


//  Ruta generală (trebuie să fie ultima)
app.get('/*', (req, res) => {
    const pagina = req.params[0]; // Extragem numele paginii din URL

    res.render(`pagini/${pagina}`, (err, html) => {
        if (err) {
            if (err.message.startsWith('Failed to lookup view')) {
                // Eroare 404 - Pagina nu a fost găsită
                const eroare404 = configurareErori.info_erori.find(e => e.identificator === 404);
                res.status(404).render('erori/eroare', {
                    titlu: eroare404.titlu,
                    text: eroare404.text,
                    imagine: configurareErori.cale_baza + eroare404.imagine
                });
            } else {
                //  Alt tip de eroare - Eroare generică
                res.status(500).render('erori/eroare', {
                    titlu: configurareErori.eroare_default.titlu,
                    text: configurareErori.eroare_default.text,
                    imagine: configurareErori.cale_baza + configurareErori.eroare_default.imagine
                });
            }
        } else {
            res.send(html); // Nu există erori - Afișăm pagina cerută
        }
    });
});

// Pornirea serverului pe portul 8080
app.listen(8080, () => {
    console.log(' Serverul rulează pe http://localhost:8080');
});
