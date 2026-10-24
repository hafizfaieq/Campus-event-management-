const express=require('express');const cors=require('cors');const sqlite3=require('sqlite3').verbose();const app=express();app.use(cors());app.use(express.json());
const db=new sqlite3.Database('../database/campus.db');
db.serialize(()=>{db.run(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT UNIQUE,password TEXT,role TEXT DEFAULT 'student')`);
db.run(`CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,description TEXT,date TEXT,time TEXT,location TEXT,category TEXT,capacity INTEGER)`);
db.run(`CREATE TABLE IF NOT EXISTS registrations(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER,event_id INTEGER,registration_date TEXT)`);
db.get('SELECT COUNT(*) n FROM events',(err,row)=>{if(row.n===0){const s=db.prepare('INSERT INTO events(title,description,date,time,location,category,capacity) VALUES(?,?,?,?,?,?,?)');[
['AI Workshop','Hands-on introduction to practical AI tools and applications.','2026-11-05','10:00 AM','Innovation Lab','Workshop',60],
['University Sports Gala','A day of sports, teamwork and campus competition.','2026-11-12','09:00 AM','Sports Ground','Sports',150],
['Software Engineering Seminar','Industry speakers discuss modern software development.','2026-11-18','02:00 PM','Main Auditorium','Seminar',120],
['Coding Competition','Compete in a fast-paced programming challenge.','2026-11-24','11:00 AM','CS Lab','Competition',80]].forEach(x=>s.run(x));s.finalize()}})});
app.get('/api/events',(req,res)=>db.all('SELECT * FROM events ORDER BY date',(e,r)=>e?res.status(500).json({error:e.message}):res.json(r)));
app.get('/api/events/:id',(req,res)=>db.get('SELECT * FROM events WHERE id=?',[req.params.id],(e,r)=>r?res.json(r):res.status(404).json({error:'Event not found'})));
app.post('/api/events',(req,res)=>{const {title,description,date,time,location,category,capacity}=req.body;db.run('INSERT INTO events(title,description,date,time,location,category,capacity) VALUES(?,?,?,?,?,?,?)',[title,description,date,time,location,category,capacity],function(e){e?res.status(400).json({error:e.message}):res.status(201).json({id:this.lastID,...req.body})})});
app.put('/api/events/:id',(req,res)=>{const {title,description,date,time,location,category,capacity}=req.body;db.run('UPDATE events SET title=?,description=?,date=?,time=?,location=?,category=?,capacity=? WHERE id=?',[title,description,date,time,location,category,capacity,req.params.id],function(e){e?res.status(400).json({error:e.message}):res.json({updated:this.changes})})});
app.delete('/api/events/:id',(req,res)=>db.run('DELETE FROM events WHERE id=?',[req.params.id],function(e){e?res.status(400).json({error:e.message}):res.json({deleted:this.changes})}));
app.post('/api/register',(req,res)=>{const {user_id,event_id}=req.body;db.run('INSERT INTO registrations(user_id,event_id,registration_date) VALUES(?,?,datetime("now"))',[user_id,event_id],function(e){e?res.status(400).json({error:e.message}):res.status(201).json({id:this.lastID})})});
app.get('/api/registrations',(req,res)=>db.all('SELECT * FROM registrations',(e,r)=>res.json(r||[])));
app.post('/api/signup',(req,res)=>{const {name,email,password,role='student'}=req.body;db.run('INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)',[name,email,password,role],function(e){e?res.status(400).json({error:e.message}):res.status(201).json({id:this.lastID})})});
app.post('/api/login',(req,res)=>db.get('SELECT id,name,email,role FROM users WHERE email=? AND password=?',[req.body.email,req.body.password],(e,r)=>r?res.json(r):res.status(401).json({error:'Invalid credentials'})));
app.listen(5000,()=>console.log('API running on http://localhost:5000'));
