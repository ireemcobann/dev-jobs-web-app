const jsonFile = "assets/json/data.json";

async function fetchJsonFile() {
    const data = await fetch(jsonFile)
    .then(res => res.json())
    return data;
}
async function render({filter = "", location = "" , fulltime= false}) {
    const jobs = await fetchJsonFile();
    const filteredJobs = jobs
    .filter(job => job.position.toLowerCase().includes(filter.toLowerCase()) || job.company.toLowerCase().includes(filter.toLowerCase()))
    .filter(job => job.location.toLowerCase().includes(location.toLowerCase()))
    .filter(job => fulltime ? job.contract === "Full Time" : true)
    jobsList.innerHTML = filteredJobs.map( job => `
        <li class="jobDesc">
            <div class="job-card">
                <img src="assets${job.logo}" alt="" />
                <div class="card-top">
                    <div class="time">
                    <p>${job.postedAt}</p>
                    <span class="dot"></span>
                    <p>${job.contract}</p>
                    </div>
                    <h2>${job.position}</h2>
                    <span>${job.company}</span>
                </div>
                <h5>${job.location}</h5>
            </div>
        </li>
        ` ).join('');
}
const filterForm = document.querySelector('#job-filter-form');
filterForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filter = formData.get('filter');
    const location = formData.get('location');
    const fulltime = formData.has('fulltime');

    render({filter, location , fulltime})

}

render({})


/* DARK MODE */
// const theme = localStorage.getItem('theme');

const themeSelector = document.querySelector('#toggle-theme');
themeSelector.addEventListener('change',toggleTheme);
const html = document.querySelector('html');


function toggleTheme(){
    if(this.checked){
        html.setAttribute('data-theme',"dark");
        
    }else{
        html.setAttribute('data-theme',"light");
    }

    localStorage.setItem('theme', this.checked ? "dark" : "light")
}


const theme = localStorage.getItem('theme');

if(theme){
    html.setAttribute('data-theme', theme);
    const isThemeDark = theme == "dark" ? true : false;
    if(isThemeDark){
        themeSelector.setAttribute('checked','checked');
    }
}
