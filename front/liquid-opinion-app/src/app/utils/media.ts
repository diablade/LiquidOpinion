import {Observable} from 'rxjs';

export class Media {
	public static blobToBase64(blob: Blob): Observable<string> {
		let reader = new FileReader();
		reader.readAsBinaryString(blob);
		return new Observable((observer) => {
			reader.onloadend = () => {
				observer.next(btoa(reader.result as string));
				observer.complete();
			};
		});
	}

	public static blobToPdf(blob: Blob): string {
		return URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}));
	}
}
