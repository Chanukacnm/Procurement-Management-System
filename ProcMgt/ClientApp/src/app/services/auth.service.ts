import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NavData, navItem } from '../_nav';
import { map } from 'rxjs/operators';
import { ModuleNames } from 'ag-grid-community';

//export const navItems: NavData[] = [
//  {
//    title: true,
//    name: 'References'
//  },
//  {
//    id: 'idCategoryMaster',
//    name: 'Category Master',
//    url: '/categorymaster',
//    icon: 'icon-options-vertical'
//  }
//]



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public invalidLogin: boolean;
  public module: NavData[];
  public navi: any;
    

  constructor(private router: Router, private http: HttpClient) {

    //this.menu = [];
    this.module = [];


  }


  loginIn(loginIn) {
    let credentials = JSON.stringify(loginIn);
    //this.router.navigate(['/dashboard']);

    this.http.post("https://localhost:44353/api/auth/authenticate", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {

      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;

      console.log("tkn=>", token);

      console.log("zzz=>", response);
    
    
      //var mnu = response['menuDetails'];
      var mod = response['moduleDetails']
      var modMenu = response['moduleMenuDetails']
      var usr = response['userDetails'];
      //var mod = response['moduleDatails'];

   
      //for (const d of (mnu)) {
      //  this.navi.push({
      //    id: d.menuIDHTML,
      //    name: d.menuName,
      //    url: d.url,
      //    icon: d.icon
      //  });
      //}
      //console.log("qqqq=>",mod[i]);

      console.log("qqqq=>", modMenu);
      debugger;
    
      
      //console.log("abc=>", mnu.length);
      //this.menu = [];
      //for (var i = 0; i < mnu.length; i++) {
      //  //console.log(mnu[i]);
      //  this.navi = mnu[i];
      //  //console.log("navi=>", this.navi);
        
      //  this.menu.push(
      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });

        

      //}
      //console.log(mod[i]);
      this.module = [];
      var ismodule1 = true;
      var ismodule2 = true;
      var ismodule3 = true;
      var ismodule4 = true;
      var ismodule5 = true;
      var ismodule6 = true;
      var ismodule7 = true;
      for (var i = 0; i < modMenu.length; i++) {
        //console.log(mnu[i]);
        this.navi = modMenu[i];

        console.log("modmenu=>", modMenu[i].moduleID);
        if (ismodule1 == true) {
          if (modMenu[i].moduleID == 1) {
            ismodule1 = false;
            ismodule2 = true;
            ismodule3 = true;
            ismodule4 = true;
            ismodule5 = true;
            ismodule6 = true;
            ismodule7 = true;

            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],
                children: this.navi['menuName'],

              },
            )
          }
        };

        if (ismodule2 == true) {
          if (modMenu[i].moduleID == 2) {
            ismodule2 = false;
            ismodule1 = true;
            ismodule3 = true;
            ismodule4 = true;
            ismodule5 = true;
            ismodule6 = true;
            ismodule7 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        }

        if (ismodule3 == true) {
          if (modMenu[i].moduleID == 3) {
            ismodule3 = false;
            ismodule1 = true;
            ismodule2 = true;
            ismodule4 = true;
            ismodule5 = true;
            ismodule6 = true;
            ismodule7 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        }

        if (ismodule4 == true) {
          if (modMenu[i].moduleID == 4) {
            ismodule4 = false;
            ismodule1 = true;
            ismodule2 = true;
            ismodule3 = true;
            ismodule5 = true;
            ismodule6 = true;
            ismodule7 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        }

        if (ismodule5 == true) {
          if (modMenu[i].moduleID == 5) {
            ismodule5 = false;
            ismodule1 = true;
            ismodule2 = true;
            ismodule3 = true;
            ismodule4 = true;
            ismodule6 = true;
            ismodule7 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        }

        if (ismodule6 == true) {
          if (modMenu[i].moduleID == 6) {
            ismodule6 = false;
            ismodule1 = true;
            ismodule2 = true;
            ismodule3 = true;
            ismodule4 = true;
            ismodule5 = true;
            ismodule7 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        };

        if (ismodule7 == true) {
          if (modMenu[i].moduleID == 7) {
            ismodule7 = false;
            ismodule1 = true;
            ismodule2 = true;
            ismodule3 = true;
            ismodule4 = true;
            ismodule5 = true;
            ismodule6 = true;
            this.module.push(
              {
                title: true,
                name: this.navi['moduleName'],

              },
            )
          }
        };
         
        this.module.push(
          {
            id: this.navi['menuIDHTML'],
            name: this.navi['menuName'],
            url: this.navi['url'],
            icon: this.navi['icon']
                  
          });



      }
      // this.module.push(
      //      {
      //       title: true,
      //        name: 'User Managment Module',
          
      //      },
      //   )
      //for (var i = 0; i < 3; i++) {
      //  console.log("kkkk=>", modMenu[i]);

        
      //  this.module.push(
          
      //    {
          
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],       
      //      url: this.navi['url'],
      //      icon: this.navi['icon']

      //    });

      //}
      //  this.module.push(
      //    {
      //      title: true,
      //      name: 'Master Module'

      //    },
      //  )
      //for (var i = 3; i < 15; i++) {
      //  console.log("kkkk=>", modMenu[i]);
               
      //  this.navi = modMenu[i];
               
      //  this.module.push(

      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });
      //}

      //  this.module.push(
      //    {
      //      title: true,
      //      name: 'Requestion Process'

      //    },
      //  )
      //  for (var i = 15; i < 17; i++) {
      //    console.log("kkkk=>", modMenu[i]);
                   
      //    this.navi = modMenu[i];
      //    this.module.push(

      //      {
      //        id: this.navi['menuIDHTML'],
      //        name: this.navi['menuName'],
      //        url: this.navi['url'],
      //        icon: this.navi['icon']
      //      });

      //  }
      //this.module.push(
      //  {
      //    title: true,
      //    name: 'Issuring Process'

      //  },
      //)
      //for (var i = 17; i < 18; i++) {
      //  console.log("kkkk=>", modMenu[i]);



      //  this.navi = modMenu[i];
      //  this.module.push(

      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });

      //}
      //this.module.push(
      //  {
      //    title: true,
      //    name: 'Quotation Process'

      //  },
      //)
      //for (var i = 18; i < 22; i++) {
      //  console.log("kkkk=>", modMenu[i]);



      //  this.navi = modMenu[i];
      //  this.module.push(

      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });

      //}
      //this.module.push(
      //  {
      //    title: true,
      //    name: 'ARN Entry'

      //  },
      //)
      //for (var i = 22;i < 23; i++) {
      //  console.log("kkkk=>", modMenu[i]);



      //  this.navi = modMenu[i];
      //  this.module.push(

      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });

      //}
      //this.module.push(
      //  {
      //    title: true,
      //    name: 'Report'

      //  },
      //)
      //for (var i = 23; i < 24; i++) {
      //  console.log("kkkk=>", modMenu[i]);



      //  this.navi = modMenu[i];
      //  this.module.push(

      //    {
      //      id: this.navi['menuIDHTML'],
      //      name: this.navi['menuName'],
      //      url: this.navi['url'],
      //      icon: this.navi['icon']
      //    });

      //}


        //}
      
      localStorage.setItem("ModuleMenuDetails", JSON.stringify(this.module));
      localStorage.setItem("ModuleDetails", JSON.stringify(mod));

      localStorage.setItem("UserDetails", JSON.stringify(usr));
      //let token = (JSON.stringify(usr));
      //localStorage.setItem("jwtUsers", token);

      //console.log("aaa=>", JSON.stringify(usr));
      //console.log("res=>", response);


      //console.log("qqq=>", this.menu);
      //console.log("zzz=>", JSON.stringify(this.menu));
      //var ccc = JSON.stringify(this.menu);
      //console.log("www=>", JSON.parse(ccc));
      //console.log("abcd=>", JSON.parse(localStorage.getItem("menu")));
    
      //var c = JSON.stringify(mnu[0])
      //console.log("ccc=>", c);
      //var d = JSON.parse(c)
      //console.log("ddd=>", d);
      //console.log("gg", JSON.parse(JSON.stringify(mnu[0])));


      
      //this.router.navigate(["/"]);


      //this.navItems = [
      //  {
      //    title: true,
      //    name: 'References'
      //  },
      //  {
      //    id: 'idCategoryMaster',
      //    name: 'Category Master',
      //    url: '/categorymaster',
      //    icon: 'icon-options-vertical'
      //  }];
      
      this.router.navigate(['/dashboard']);

    }, err => {
      this.invalidLogin = true;

      alert("Invalid Username or Password...!");
    });

  }


  logOut() {
    //console.log("out2=>", localStorage.getItem("jwt"));
    localStorage.removeItem("jwt");
    //console.log("out=>", localStorage.getItem("jwt"));
  }

}
