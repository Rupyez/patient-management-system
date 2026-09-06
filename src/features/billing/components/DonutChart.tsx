
interface DonutChartProps{
    data:{label:string; value:number; color:string}[]
}

export default function DonutChart({data}:DonutChartProps){


    return(
        //container div - centers the chart and legend
        <div>

            {/* Chart container - Relative positioning for centering */}
            <div>

                {/* SVG - creates the donut chart segments */}
                <svg></svg>

                {/* center text - absolute positioned over the chart */}
                <div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </div>

            {/* Legend - flex wrap for responsive layout */}
            <div>
                
            </div>
        </div>
    )
}