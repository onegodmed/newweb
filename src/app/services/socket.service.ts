import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseurlService } from '../config/baseurl.service';
import { EndpointService } from '../config/endpoint.service';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders()
	.set('Access-Control-Allow-Origin', '*')
	.set('content-type', 'application/json')
	.set('content-type', 'application/x-www-form-urlencoded');

@Injectable({
	providedIn: 'root'
})
export class SocketService {

	constructor(private socket: Socket, private http: HttpClient, public baserurl: BaseurlService, public endpoint: EndpointService) { }

	connectSocket() {
		var resi = this.socket.connect();
		// console.log(resi);
	}

	// users() {
	// 	var result = this.socket.emit('connection', {userId:'7860'});
	// 	console.log('hi sam',result);
	// }

	// join() {
	// 	return this.http.post(this.baserurl.BASE_URL + this.endpoint.MY_BOOKING, { 'headers': headers, "token": localStorage.getItem('token') }).pipe(
	// 		map(data => {
	// 			return data;
	// 		})
	// 	);
	// }

	joinUser(userId: Number, roomId: Number): Observable<any> {

        //JOIN USER 
        this.socket.emit('join', { userId:userId, fcmToken: 'token'});
        this.socket.emit('online',{ userId:userId});

        //SYNC DATA FROM SOCKET
        const timeOfLast = new Date().getTime();
        this.socket.emit('sync', { fromdate:0,todate: timeOfLast,roomId:Number(roomId),limit:50 });
       return new Observable<any>(observer => {
        this.socket.on('sendMessage', (message: any)=>{
            observer.next( message);
            //console.log('===commingg adata==>=>',message);
         });
       

        // return () => {
        //     this.socket.disconnect();
        // }
    });
    }

	getMessage(roomId: any): Observable<any> {
		return new Observable<any>(observer => {
			this.socket.on('sync', (data: any) => {

				observer.next(data);
			});

			// return () => {
			//     this.socket.disconnect();
			// }
		});
	}

	sendMessage(data:any, roomId:any): void {
		console.log("comming in room id====>>>",roomId);
		console.log("comming in data====>>>",data);
 
		
 
		
		//SEND MESSAGE
		this.socket.emit('sendMessage', data);
 
		//SYNC DATA AFTER SEND MESSAGE
		 var timeOfLast = new Date().getTime();
		 var timeOfLast = timeOfLast+Number(10);
		 this.socket.emit('sync', { fromdate:0,todate: timeOfLast,roomId:Number(roomId),limit:50 });
		 //this.getMessageofloginUser(5421);
 
	 }

}