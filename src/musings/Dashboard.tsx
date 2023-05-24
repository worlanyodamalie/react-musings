import React from "react";
import { CountriesDebounce } from "./index";

export function Dashboard(){
    return (
        <div style={{width: '100%' , display: 'flex' , padding: '5px'}}>
              <div style={{ display: 'flex' , flexDirection:'column'}}>
                     <div>
                        <CountriesDebounce />
                     </div>
              </div>
        </div>
    )
}