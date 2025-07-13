import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback, useEffect} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import 'echarts-wordcloud';

export default () => {
  const {
    serviceParamsGet,
    setServiceParamsGet,
    serviceParamsPost,
    setServiceParamsPost,
    serviceParamsPut,
    setServiceParamsPut,
    serviceParamsDelete,
    setServiceParamsDelete,
    componentParamsPrivate,
    setComponentParamsPrivate
  } = useModel('TemplateEcharts.model');

  useEffect(()=>{
    let chartDom = document.getElementById('echartsOfficial');
    let myChart = echarts.init(chartDom);
    let option;
    
    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    
    option && myChart.setOption(option);
    
  },[])

  useEffect(()=>{
    let chartDom = document.getElementById('echartsLiquidfill');
    let myChart = echarts.init(chartDom);
    let option;
    
    option = {
			tooltip: {
				show: true
			},
			series: [{
				type: 'liquidFill',
				data: [0.6, 0.55, 0.4, 0.25],
				radius: '60%',
				outline: {
					show: false
				},
				backgroundStyle: {
					borderColor: '#156ACF',
					borderWidth: 1,
					shadowColor: 'rgba(0, 0, 0, 0.4)',
					shadowBlur: 20
				},
				shape: 'path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
				label: {
					position: ['38%', '40%'],
					fontSize: 40,
					color: '#D94854'
				}
			}]
    };
    
    option && myChart.setOption(option);
    
  },[])

  useEffect(()=>{
    let chartDom = document.getElementById('echartsWordcloud');
    let myChart = echarts.init(chartDom);
    let option;
    
    const list = [
			{
				value: '50',
				name: '华为',
				textStyle: {
					shadowBlur: 4,
					shadowColor: '#ECEFFF',
					shadowOffsetY: 14,
					color: '#73DDFF',
				},
			}, // 50
			{ value: '30', name: 'VIVO' },
			{ value: '29', name: 'OPPO' },
			{ value: '28', name: 'HONOR' },
			{ value: '27', name: '红米' },
			{ value: '26', name: '小米' },
			{ value: '25', name: '美图' },
			{ value: '24', name: 'ONEPLUS' },
			{ value: '23', name: '魅族' },
			{ value: '22', name: '红手指' },
			{ value: '21', name: 'SAMSUNG' },
			{ value: '20', name: '金立' },
			{ value: '16', name: 'BLACKBERRY' },
			{ value: '15', name: '诺基亚' },
			{ value: '14', name: '锤子' },
			{ value: '13', name: '大疆' },
			{ value: '12', name: '361' },
			{ value: '11', name: '摩托罗拉' },
			{ value: '10', name: '联想' },
			{ value: '9', name: '玩家国度' },
		]
		option = {
			tooltip: {
				show: true,
				borderColor: '#fe9a8bb3',
				borderWidth: 1,
				padding: [10, 15, 10, 15],
				confine: true,
				backgroundColor: 'rgba(255, 255, 255, .9)',
				textStyle: {
					color: 'hotpink',
					lineHeight: 22
				},
				extraCssText: 'box-shadow: 0 4px 20px -4px rgba(199, 206, 215, .7);border-radius: 4px;'
			},
			series: [
				{
					type: 'wordCloud',
					// The shape of the "cloud" to draw. Can be any polar equation represented as a
					// callback function, or a keyword present. Available presents are circle (default),
					// cardioid (apple or heart shape curve, the most known polar equation), diamond (
					// alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.
		
					shape: 'pentagon',
		
					// A silhouette image which the white area will be excluded from drawing texts.
					// The shape option will continue to apply as the shape of the cloud to grow.
		
					// Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
					// Default to be put in the center and has 75% x 80% size.
		
					left: 'center',
					top: 'center',
					width: '100%',
					height: '100%',
					right: null,
					bottom: null,
		
					// Text size range which the value in data will be mapped to.
					// Default to have minimum 12px and maximum 60px size.
		
					sizeRange: [14, 50],
		
					// Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
		
					rotationRange: [0, 0],
					rotationStep: 0,
		
					// size of the grid in pixels for marking the availability of the canvas
					// the larger the grid size, the bigger the gap between words.
		
					gridSize: 25,
		
					// set to true to allow word being draw partly outside of the canvas.
					// Allow word bigger than the size of the canvas to be drawn
					drawOutOfBound: false,
		
					// If perform layout animation.
					// NOTE disable it will lead to UI blocking when there is lots of words.
					layoutAnimation: true,
		
					// Global text style
					textStyle: {
						fontFamily: 'PingFangSC-Semibold',
						fontWeight: 600,
						color: function (params) {
							let colors = ['#fe9a8bb3', '#fe9a8bb3', '#fe9a8b03', '#9E87FFb3', '#9E87FFb3', '#9E87FFb3', '#fe9a8bb3', '#fe9a8bb3', '#fe9a8bb3', '#73DDFF', '#58D5FF']
							return colors[parseInt(Math.random() * 10)];
						},
					},
					emphasis: {
						focus: 'none',
					},
		
					// Data is an array. Each array item must have name and value property.
					data: list,
				},
			],
		};
    
    option && myChart.setOption(option);
    
  },[])
  return (
    <div>
      <div id="echartsOfficial" className={styles.echartsOfficial}></div>
      <div id="echartsLiquidfill" className={styles.echartsLiquidfill}></div>
      <div id="echartsWordcloud" className={styles.echartsWordcloud}></div>
    </div>
  );
};