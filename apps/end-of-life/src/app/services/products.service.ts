import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productCollection: CollectionReference<DocumentData, DocumentData>;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  getAllProducts(): Observable<Product[]> {
    const q = query(this.productCollection);

    return collectionData(q, {
      idField: 'id',
    }) as Observable<Product[]>;
  }
}
