export interface ProductDTO {
  id?: string;
  name: string;
  note?: string;
  components: Array<{
    component: string;
    cycle: string;
  }>;
}
