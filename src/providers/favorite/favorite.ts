import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Dish} from '../../shared/dish';
import {Observable} from 'rxjs/Observable';
import {DishProvider} from '../dish/dish';
import {Storage} from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient,
              private dishservice: DishProvider,
              private storage: Storage,
              private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];
    this.storageInitiation();
    console.log(this);
  }


  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)){
      this.favorites.push(id); //the same like action should be performed to push data to the server
      this.storage.set("favorites", this.favorites);//push info into the storage

      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id +' added as a favorite successfully'
      });
    }
    console.log('favorites', this.favorites);
    return true;
  }

  storageInitiation(){
    this.storage.get("favorites").then(fav_ids => {
      //console.log(fav_ids); //debug
      if (fav_ids) {
        fav_ids.forEach(id => this.favorites.push(id));
      } else {
        console.log("storage is empty");
      }
    });
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);

  }


  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))); //cool approach!!!
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set("favorites", this.favorites); // add key one more time on order to re-fresh storage
      return this.getFavorites();
    } else {
      console.log(`Deleting non-existing favorite ${id}`);
      return Observable.throw(`Deleting non-existing favorite ${id}`);
    }
  }

}





