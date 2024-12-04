export interface formObject {
  form1: {
    categoryNameEn: string;
    categoryNameAr: string;
  };
  form2: {
    id: string;
    subCategoryNameEn: string;
    subCategoryNameAr: string;
  }[];
}

export interface SubCategory {
  id: string;
  subCategoryNameEn: string;
  subCategoryNameAr: string;
}
