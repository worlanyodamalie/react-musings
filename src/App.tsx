import { JSXElementConstructor, ReactElement, ReactFragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

interface IProducts  {
  
  product: { name: string , stocked: boolean, price: number , category: string } 
}

function ProductCategoryRow({category}: {category: string}){
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  )
}

function ProductRow({product}: IProducts ){
  const name = product.stocked ? product.name : 
   ( 
    <span style={{color: 'red'}}>
        {product.name}
    </span>
     );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductTable({products,filterText,inStockOnly}: { products: IProducts[] , filterText: string , inStockOnly: boolean }){
   const rows: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>>  | JSX.Element[] | null | undefined = [];
   let lastCategory: null | string = null;

   products.forEach((product) => {
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return;
    }
    if(inStockOnly && !product.stocked){
      return;
    }
     if(product.category !== lastCategory){
       rows.push(
         <ProductCategoryRow 
            category={product.category} 
            key={product.category} />
       )
     }
     rows.push(
       <ProductRow 
          product={product}
          key={product.name}
       />
     )
     lastCategory = product.category
   })

   return (
     <table width={"100%"}>
       <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
       </thead>
       <tbody>{rows}</tbody>
     </table>
   )
}

function SearchBar({filterText,inStockOnly,onFilterTextChange,onInStockOnlyChange}: {filterText: string , inStockOnly: boolean }){
  return (
    <form>
      <input 
        onChange={(e) => onFilterTextChange(e.target.value)}
        value={filterText} 
        style={{width: "100%", height: '25px' , marginBottom: '4px'}} 
        type="text" 
        placeholder="search"
        />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductsTable({products}: { products: IProducts[] }){
  const [filterText, setFilterText] = useState("")
  const [inStockOnly,setInStockOnly] = useState(false)

  return (
    <div>
      <SearchBar 
         filterText={filterText}
         inStockOnly={inStockOnly}
         onFilterTextChange={setFilterText}
         onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
         />
    </div>
   )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{width: '100%' , display: 'flex' , justifyContent: 'center'}}>
      
      <div style={{flex: "0 0 20%"}}>
         <a href="/"><h3>Home</h3></a>
         <a href="/tasks"><h3>Understanding Reducers</h3></a>
         <a href="/musings">Country list with debouncing</a>
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <FilterableProductsTable products={PRODUCTS}/>
    </div>
  )
}

export default App
