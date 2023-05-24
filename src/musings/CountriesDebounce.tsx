import React , {useState,useCallback} from "react";



export function CountriesDebounce(){
    const [searchText,setSearchText] = useState('')
    const [list,setList] = useState([])
    const [options,setOptions] = useState([])
    const API_ENDPOINT = `https://algochurn-server.onrender.com/practice/countries`
    
    const debounce = (cb: any,delay: number) => {
        let timer: number;
        return function (...args: any){
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args)
            } , delay)

        }
    }

    const fetchData = (value: string) => {
        fetch(`${API_ENDPOINT}/${value}`)
          .then((res) => res.json())
          .then((data) => {
             const { countries } = data
             setOptions(countries)
          })
          .catch((err) => {
            console.log('error',err)
          })
    }

     
    const onChange = useCallback(debounce(
        (value: string ) => {
          if(value.length > 1){ 
            fetchData(value)
        } 
        },1000
    ),[]) 
    
    

    const handleChange = (value: string) => {
        setSearchText(value)
        onChange(value)
    }

    return (
        <div style={{padding: '5px'}}>
            <h3 style={{
                padding: '3px'
            }}>Country list with debouncing</h3>
             <div>
                <input 
                  placeholder="Search here"
                  value={searchText}
                  style={{
                    padding: '12px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#f1f5f9',
                    width: '400px'
                  }}
                  onChange={(e) => handleChange(e.target.value)}
                  type="text" />
             </div>
             {
                options.length > 0 &&  (
                    <div style={{height: '100px' , position: 'relative'}}>
                  <div style={{
                      backgroundColor: '#f1f5f9',
                      width: '400px',
                      borderRadius: '5px',
                      position: 'absolute',
                      top: '10px',
                      padding: '5px',
                  }}>
                      <ul>
                        {
                           options.map((item,index) => {
                               return (
                                <li key={`opt-`+ index}>{item}</li>
                               )
                           }) 
                        }
                        
                      </ul>
                  </div>
             </div>
                ) 
             }
             
        </div>
    )
}