import {TextItem} from '../components/addQuestion'
import { readyTest } from '../App';
import {Theme} from '../components/shop'
export type UserType  = {
    name:string,
    password: string,
    friends: {};
    tests: readyTest | [];
    secretKey: string;
    themes: Theme;
    description: string;
    countOfPassedTests: number;
    headerTheme: boolean
    money: number;
    isAutorization: boolean;
    viewTests: Set<string>;
    [key:string]: any
}


/*
class User implements UserType {
    name:string;
    password: string;
    friends: {};
    tests: [];
    secretKey: string;
    themes: [];
    description: string;
    resultTests: [];
    constructor(name:string, password:string, friends:{}, tests:[], secretKey:string, themes:[], description:string, resultTests:[]) {
        this.name = name;
        this.password = password;
        this.friends = friends;
        this.tests = tests;
        this.secretKey = secretKey;
        this.themes = themes;
        this.description = description;
        this.resultTests = resultTests;
    }
}
    */