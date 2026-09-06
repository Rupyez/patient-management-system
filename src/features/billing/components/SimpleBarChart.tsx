

interface SimpleBarChartProps{
    data:{label:string; value:number; color?:string}[];
    height?:number;
}

export default function SimpleBarChart({data, height = 200}:SimpleBarChartProps){

    //calculate maximum value for scaling
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return(

        //container div - flex container for bars with full height
       <div>
            {/* Map through data to create bars */}
            {data.map((item, index) =>(
                //individual bar container - flex column for bar and label
                <div>
                    {/* Bar div - height calculated based on value relative to max */}
                    <div/>
                    {/* label div - text below each bar */}
                    <span></span>
                </div>
            ))}
        </div>
    )

}