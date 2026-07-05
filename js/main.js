
const sections = {
  profile: document.getElementById("profile"),
  summary: document.getElementById("summary"),
  skills: document.getElementById("skills"),
  projects: document.getElementById("projects"),
  education: document.getElementById("education"),
  opensource: document.getElementById("opensource"),
  interests: document.getElementById("interests"),
  footer: document.getElementById("footer")
};

async function getJSON(path){
  const res = await fetch(path);

  if(!res.ok){
    throw new Error(`Unable to load ${path}`);
  }

  return await res.json();
}

async function loadProfile(){

  const profile = await getJSON("data/profile.json");

  sections.profile.innerHTML = `
    <div class="avatar">${profile.initials}</div>

    <h1 class="name">${profile.name}</h1>

    <p class="tagline">${profile.tagline}</p>

    <nav class="links">
      <a href="${profile.linkedin}" target="_blank">LinkedIn</a>
      <a href="${profile.github}" target="_blank">GitHub</a>
      <a href="${profile.kaggle}" target="_blank">Kaggle</a>
    </nav>
  `;

  sections.summary.innerHTML = `
    <div class="section-label">§1 — Summary</div>

    <h2 class="section-title">About</h2>

    <p class="lede">${profile.about}</p>
  `;

  sections.interests.innerHTML = `
    <div class="section-label">§6 — Interests</div>

    <h2 class="section-title">Currently thinking about</h2>

    <div class="interest-list">
      ${profile.interests.map(i=>`<span>${i}</span>`).join("")}
    </div>
  `;

  sections.footer.innerHTML = `
    <p>${profile.footer}</p>
  `;
}

async function loadSkills(){

  const skills = await getJSON("data/skills.json");

  let html = `
    <div class="section-label">§2 — Toolset</div>

    <h2 class="section-title">Skills</h2>
  `;

  skills.forEach(skill=>{

    html += `
      <div class="skill-row">
        <div class="label">${skill.title}</div>
        <div class="value">${skill.value}</div>
      </div>
    `;

  });

  sections.skills.innerHTML = html;
}

async function loadEducation(){

  const education = await getJSON("data/education.json");

  let html = `
    <div class="section-label">§4 — Education</div>

    <h2 class="section-title">Background</h2>
  `;

  education.forEach(item=>{

    html += `
      <div class="edu-row">

        <div>
          <div class="edu-degree">${item.degree}</div>
          <div class="edu-school">${item.school}</div>
        </div>

        <div class="edu-dates">${item.year}</div>

      </div>
    `;

  });

  sections.education.innerHTML = html;
}

async function loadProjects(){

  const files = [
    "pipi",
    "trafisight",
    "skintelligent",
    "dynamic-fashion-pricing",
    "lazybot"
  ];

  let html = `
    <div class="section-label">§3 — Selected work</div>

    <h2 class="section-title">Projects</h2>
  `;

  for(const file of files){

    const project = await getJSON(`projects/${file}.json`);

    html += `
      <div class="project">

        <div class="project-head">

          <h3 class="project-title">${project.title}</h3>

          <a class="project-link" href="${project.repo}" target="_blank">
            repo →
          </a>

        </div>

        <div class="project-stack">${project.stack}</div>

        <ul>

          ${project.points.map(point=>`<li>${point}</li>`).join("")}

        </ul>

      </div>
    `;
  }

  sections.projects.innerHTML = html;
}

async function loadOpenSource(){

  const profile = await getJSON("data/profile.json");

  sections.opensource.innerHTML = `
    <div class="section-label">§5 — Elsewhere</div>

    <h2 class="section-title">Self-learning & Open Source</h2>

    <p class="lede">
      ${profile.opensource}
    </p>
  `;
}

async function init(){

  await loadProfile();

  await loadSkills();

  await loadProjects();

  await loadEducation();

  await loadOpenSource();

}

init();
