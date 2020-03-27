import React, { useState } from 'react';
import { Typography, Button, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './Welcome.less';

const Welcome: React.FC<{}> = () => {
  const [buttonDisplay, setButtonDisplay] = useState(0);
  let slider:Carousel | null;

  const resumeTemplates = (count:number) => {
    const tempList = [];
    for (let i = 1; i <= count; i += 1) {
      tempList.push(<div onMouseEnter={() => setButtonDisplay(i)} onMouseLeave={() => {setButtonDisplay(0)}} className={styles.template} key={i}>
        <Button className={styles.useButton} style={{display: buttonDisplay === i ? 'block' : 'none'}} type="primary" size="large">Use This Template</Button>
        <img alt="" className={styles.resumeDemo} src={require(`../assets/resume-demo${(i % 2) + 1}.jpg`)} />
      </div>)
    }
    return tempList;
  }
  return <div className={styles.main}>
    <Typography.Title className={styles.welcomeTitle}>Only 2% of resumes make it past the first round. Be in the top 2%</Typography.Title>
    <Typography.Title className={styles.welcomeContent} level={4}>Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!</Typography.Title>

    <div className={styles.slider}>
      <Button type="primary" size="large" shape="circle" icon={<LeftOutlined />} className={styles.btnLeft} onClick={() => slider && slider.prev()}/>
      <Carousel ref={c => (slider = c)} autoplay centerMode swipeToSlide slidesToShow={3} className={styles.welcomeDemo}>
        {resumeTemplates(5)}
      </Carousel>
      <Button type="primary" size="large" shape="circle" icon={<RightOutlined />} className={styles.btnRight} onClick={() => slider && slider.next()}/>
    </div>
  </div>
};

export default Welcome;
