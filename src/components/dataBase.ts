


    export abstract class BASE {
    
      abstract path: string;
      abstract users: string;
      abstract tests: string;
  
    
      abstract sendData(URL: string, METHOD: string, BODY?: any): Promise<string>;
      abstract getData(URL: string, METHOD: string): Promise<string>;
    }
  

  


  