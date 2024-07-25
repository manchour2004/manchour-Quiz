let histoire = [
    {
        Question: "Quand le Togo a-t-il eu son indépendance ?",
        choix: [1957, 1960, 1962],
        reponse: 1960
    },
    {
        Question: "Quel pays colonisait le Togo avant son indépendance ?",
        choix: ["France", "Allemagne", "Royaume-Uni"],
        reponse: "France"
    },
    {
        Question: "Qui fut le premier président de la République togolaise après l'indépendance ?",
        choix: ["Sylvanus Olympio", "Gnassingbé Eyadéma", "Faure Gnassingbé"],
        reponse: "Sylvanus Olympio"
    },
    {
        Question: "En quelle année le Togo est-il devenu une colonie allemande ?",
        choix: [1884, 1894, 1904],
        reponse: 1884
    },
    {
        Question: "Quel événement marquant a eu lieu au Togo le 13 janvier 1963 ?",
        choix: ["Indépendance", "Coup d'État", "Élection présidentielle"],
        reponse: "Coup d'État"
    },
    {
        Question: "Quel est le nom de l'actuel président du Togo (2024) ?",
        choix: ["Faure Gnassingbé", "Gilchrist Olympio", "Agbéyomé Kodjo"],
        reponse: "Faure Gnassingbé"
    },
    {
        Question: "Quel est le nom de la capitale du Togo ?",
        choix: ["Lomé", "Kpalimé", "Sokodé"],
        reponse: "Lomé"
    },
    {
        Question: "Quel est le principal port maritime du Togo ?",
        choix: ["Port de Kpémé", "Port de Lomé", "Port de Aného"],
        reponse: "Port de Lomé"
    },
    {
        Question: "En quelle année le Togo a-t-il rejoint les Nations Unies ?",
        choix: [1956, 1960, 1962],
        reponse: 1960
    },
    {
        Question: "Quelle est la langue officielle du Togo ?",
        choix: ["Ewé", "Français", "Kabyé"],
        reponse: "Français"
    }
];

const Container = document.getElementById('quiz');
const resultats= document.getElementById('resultat');
const submitButton = document.getElementById('soumettre');
const retryButton = document.getElementById('reéssayer');
const showAnswerButton = document.getElementById('showAnswer');

let QuestionActuelle=0;
let score=0;
let reponseIncorecte=[];

function melangerArray(array) {
for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
}
}

function Afficher(){
let Questions=histoire[QuestionActuelle];
const QuestionHtml=document.createElement('div');
QuestionHtml.className='question';
QuestionHtml.innerHTML=Questions.Question;

const Optionhtml=document.createElement('div');
Optionhtml.className='options';

const OptionMelange=[...Questions.choix];
melangerArray(OptionMelange);

for (let index = 0; index < OptionMelange.length; index++) {
        const options=document.createElement('label');
        options.className='option';

        const choix=document.createElement('input');
        choix.type='radio';
        choix.name='quiz';
        choix.value=OptionMelange[index];

        const choixTexte=document.createTextNode(OptionMelange[index]);
        options.appendChild(choix);
        options.appendChild(choixTexte);
        Optionhtml.appendChild(options);
}
Container.innerHTML='';
QuestionHtml.appendChild(Optionhtml);
Container.appendChild(QuestionHtml);
}

function VerifierReponse(){
    let choixSelection = document.querySelector('input[name="quiz"]:checked');
    if (choixSelection) {
        const choix=choixSelection.value;
        if (choix== histoire[QuestionActuelle].reponse) {
            score++;
        }
        else{
            reponseIncorecte.push(
                {
                    Question: histoire[QuestionActuelle].Question,
                    VotreReponse: choix,
                    ReponseCorrecte: histoire[QuestionActuelle].reponse,
                }
            );
        }
        QuestionActuelle++;
        choixSelection=false;
        if(QuestionActuelle<histoire.length){
            Afficher()
        }
        else{
            resultat();
        }
    }
}

function resultat(){
    Container.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton .style.display = 'inline-block';
    resultats.innerHTML = `Vous avez obtenu ${score} sur ${histoire.length} !`;
}

function reéssayer(){
    score=0;
    QuestionActuelle=0;
    reponseIncorecte = [];
    Container.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton .style.display = 'none';
    resultats.innerHTML='';
    Afficher();
}

function Correction(){
    Container.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton .style.display = 'none';
    let corriger=''
    for (let index = 0; index < reponseIncorecte.length; index++) {
        corriger+=`
                <p>
                    <strong>Question :</strong> ${reponseIncorecte[index].Question}<br>
                    <strong>Votre réponse :</strong> ${reponseIncorecte[index].VotreReponse}<br>
                    <strong>Réponse correcte :</strong> ${reponseIncorecte[index].ReponseCorrecte}
                </p>
        `
    }
    resultats.innerHTML = `
    <p>Vous avez obtenu ${score} sur ${histoire.length} !</p>
    <p>Réponses incorrectes :</p>
    ${corriger}
  `;
}

submitButton.addEventListener('click', VerifierReponse);
retryButton.addEventListener('click', reéssayer);
showAnswerButton.addEventListener('click', Correction);

Afficher();
