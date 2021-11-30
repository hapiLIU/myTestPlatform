set names utf8;
drop database if exists platSql;
create database platSql charset=utf8;
use platSql;
create table account (
    uid int primary key auto_increment,
    uname varchar(16) not null unique,
    upwd varchar(10) not null,
    uemail varchar(64),
    utype varchar(16)                
);
insert into account (uid,uname,upwd,uemail,utype) values(null,"rootLY","08161239LY","12138@163.com",'root'),(null,"hapi","12138","kong@163.com",'user')