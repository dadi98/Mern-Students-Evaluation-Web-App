import * as React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function StudentChart({results}) {



    const options = {
        height: 295,
        animationEnabled: true,
        title: {
            text: "Students results statistics",
            color: '#063d80'
        },
        subtitles: [{
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: false
        }],
        data: [{
            type: "doughnut",
            radius: "100%",
            
            showInLegend: true,
            color: 'black',
            yValueFormatString: "#,###'%'",
            dataPoints: [
                
                { name: "Passed", y: results ? results[0] : 50, color: '#063d80' },
                { name: "failed", y: results ? results[1] : 50, color: '#c4d3f5' }
            ]
        }]
    }

    return (
        <>
             <CanvasJSChart options = {options} />
            
        </>        
    );
}

/*import axios from 'axios';
import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {DonutChart} from 'react-circle-chart'

export default function StudentChart() {
    

    const chart = {
        items: [
                    {
                        value: 75,
                        label: 'Admis',
                        color: 'Green'
                        //displayValue: 'Admis'
                    },
                    {
                        value: 25,
                        label: 'Ajourné',
                        color: 'red'
                        //displayValue: 'Ajourné'
                    }
        ],
        size: 200,
        showTotal: false,
        tooltipFontSize: '15px'

    }

    return ( 
    <>
        <Container className='bg-primary'>
            <Row className=''>
                <Col  className=''>
                    <DonutChart {...chart} />
                </Col>
            </Row>   
        </Container>
    </> 
    );
}
 
 */