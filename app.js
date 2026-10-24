const fallback=[
{id:1,title:"AI Workshop",description:"Hands-on introduction to practical AI tools and applications.",date:"2026-11-05",time:"10:00 AM",location:"Innovation Lab",category:"Workshop",capacity:60},
{id:2,title:"University Sports Gala",description:"A day of sports, teamwork and campus competition.",date:"2026-11-12",time:"09:00 AM",location:"Sports Ground",category:"Sports",capacity:150},
{id:3,title:"Software Engineering Seminar",description:"Industry speakers discuss modern software development.",date:"2026-11-18",time:"02:00 PM",location:"Main Auditorium",category:"Seminar",capacity:120},
{id:4,title:"Coding Competition",description:"Compete in a fast-paced programming challenge.",date:"2026-11-24",time:"11:00 AM",location:"CS Lab",category:"Competition",capacity:80}];
const grid=document.getElementById('eventsGrid');
function render(list){grid.innerHTML=list.map(e=>`<article class="card"><span class="badge">${e.category}</span><h3>${e.title}</h3><p>${e.description}</p><b>${e.date} • ${e.time}</b><p>📍 ${e.location}<br>Available seats: ${e.capacity}</p><button onclick="register(${e.id})">Register</button></article>`).join('')}
async function load(){try{const r=await fetch('http://localhost:5000/api/events');if(!r.ok)throw 0;render(await r.json())}catch(e){render(fallback)}}load();
function apply(){const q=document.getElementById('search').value.toLowerCase(),c=document.getElementById('filter').value;const source=[...document.querySelectorAll('.card')];source.forEach(x=>{const ok=x.innerText.toLowerCase().includes(q)&&(c===''||x.innerText.includes(c));x.style.display=ok?'block':'none'})}
document.getElementById('search').oninput=apply;document.getElementById('filter').onchange=apply;
function register(id){alert('Registration submitted for event #'+id+'. Connect the backend API to save it in the database.')}

document.getElementById('loginForm').onsubmit = async e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const msg = document.getElementById('loginMsg');

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    msg.textContent = 'Login successful. Welcome, ' + data.name + '!';
  } catch (error) {
    msg.textContent = 'Login failed. Check your email, password, and backend server.';
  }
};

