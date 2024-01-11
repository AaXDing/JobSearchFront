import React, { useEffect, useState } from 'react';
import '../styles/favorite.css';
import { Navigate } from "react-router-dom";
import { Button, Avatar, List, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getUser } from './helper/localUser';
import Header from './Header';

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

const Favorite: React.FC = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<job[]>([]);
    const [hasMore, setHasMore] = useState(true);


    const userId = getUser();

    useEffect(() => {

        if (userId) {
            fetch('http://localhost:8080/JobSearch_war_exploded/history?user_id=' + userId, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setInitLoading(false);
                    setList(data);
                }).catch((error) => {
                    console.log(error);
                    setInitLoading(false);

                })
        }
    }, [userId]);

    if (!userId) {
        return <Navigate to="/" />;
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

    const loadMore =
        !initLoading && !loading && hasMore ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

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
        <div>
            <Header />
            <List
                className="fav-job-list"
                loading={initLoading}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={list}
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
    )
}

export default Favorite;