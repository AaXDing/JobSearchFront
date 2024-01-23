import React, { useEffect, useState } from 'react';
// import '../styles/recommend.css';
import '../styles/content.css';
import { Avatar, List, Skeleton, Input, Layout, Breadcrumb } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getUser } from './helper/localUser';
import Header from './Header';

const { Search } = Input;

interface job {
    keywords: [string],
    favorite: boolean,
    id: string,
    title: string,
    location: string,
    company_logo: string,
    url: string
}

const count = 3;

const { Content, Footer } = Layout;

const RecommendJob: React.FC = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<job[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const userId = getUser();

    const onRecommend = (lat: number, lon: number) => {
        fetch("http://localhost:8080/JobSearch_war_exploded/recommendation?user_id=" + userId + '&lat=' + lat + '&lon=' + lon, {
            method: "GET",
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                setList(data);
            }).catch((error) => {
                console.log(error);
                setInitLoading(false);
            });
    }

    useEffect(() => {
        var lat = 0;
        var lon = 0;
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            if (userId) {
                onRecommend(lat, lon);
            }
        });
        console.log(lat, lon)
    }, []);

    if (!userId) {
        window.location.href = '/';
    }

    const onLoadMore = () => {
        setLoading(true);
        // ajax({
        //     method: 'GET',
        //     url: 'http://localhost:8080/JobSearch_war_exploded/history?user_id=' + userId,
        //     data: null,
        //     success: function (res: any) {
        //         console.log(res.data);
        //         setList(res.data);
        //         setLoading(false);
        //     },
        //     error: function () {
        //         throw new Error('Invalid');
        //     }
        // });
    };

    const changeFavorite = (item: any) => {
        return () => {
            setList((prevList) => {
                return prevList.map((listItem) =>
                    listItem.id === item.id ? { ...listItem, favorite: !item.favorite } : listItem
                );
            });
            var method = !item.favorite ? 'POST' : 'DELETE';
            fetch('http://localhost:8080/JobSearch_war_exploded/history', {
                method: method,
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    user_id: userId,
                    favorite: item,
                })
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error);
                    setInitLoading(false);
                });
        };
    }


    return (
        <Layout>
            <Header />
            <Content style={{ padding: '0 50px', position: "relative"}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Recommendation</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                    <List
                        className="job-list"
                        itemLayout="horizontal"
                        dataSource={list}
                        // loadMore={loadMore}
                        renderItem={item => (
                            <List.Item
                                actions={[<FontAwesomeIcon onClick={changeFavorite(item)} icon={faHeart} color={item.favorite ? "red" : "gray"} />]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.company_logo} />}
                                        title={<a href={item.url}>{item.title}</a>}
                                        description={item.keywords.join(', ')}
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Job Search ©2024 Created by Yuheng Ding</Footer>
        </Layout>
    )
}

export default RecommendJob;