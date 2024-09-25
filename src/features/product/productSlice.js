import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,addBrand ,addCategory,fetchProductsByFillters,fetchBrands,fetchCategories, fetchProductById, createProduct,updateProduct} from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  brands:[],
  categories:[],
  selectedProduct:null
};

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync=createAsyncThunk(
  'product/create',
  async(product)=>{
    const response=await createProduct(product);
    return response.data
  }
)

export const addBrandAsync=createAsyncThunk(
  'product/createbrand',
  async(brand)=>{
    console.log('slice');
    const response=await addBrand(brand);
    return response.data
  }
)

export const addCategoryAsync=createAsyncThunk(
  'product/createcategory',
  async(category)=>{
    console.log('slice');
    const response=await addCategory(category);
    return response.data
  }
)

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data);
    return response.data;
  }
);

export const fetchProductsByFilltersAsync = createAsyncThunk(
  'product/fetchProductsByFillters',
  async ({filter,sort,pagination,userType}) => {
    const response = await fetchProductsByFillters({filter,sort,pagination,userType});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(addBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(addCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
      

  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectBrands=(state)=>state.product.brands;
export const selectProductById=(state)=>state.product.selectedProduct;
export const selectCategories=(state)=>state.product.categories;
export const selectAllProducts = (state) => state.product.products;
export default productSlice.reducer;
