import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { ProductDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productCollection: CollectionReference<DocumentData, DocumentData>;

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'products');
  }

  getAllProducts(): Observable<ProductDTO[]> {
    const q = query(this.productCollection);

    return collectionData(q, {
      idField: 'id',
    }) as Observable<ProductDTO[]>;
  }

  addProduct(product: ProductDTO): Observable<ProductDTO> {
    return from(addDoc(this.productCollection, product)).pipe(
      map((docRef) => ({
        // Include the document ID from Firestore
        id: docRef.id,
        ...product,
      }))
    );
  }

  deleteProduct(productId: string): Observable<void> {
    const productDocRef = doc(this.productCollection, productId);
    return from(deleteDoc(productDocRef));
  }
}
