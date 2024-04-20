import React, { useState } from 'react';
import {
    View, Button, TextInput, Text,
    FlatList, StyleSheet, TouchableOpacity
} from 'react-native';

const data = [
    {
        id: 1, title: 'React',
        content: `ReactJS is a declarative, efficient, and flexible 
                JavaScript library for building user interfaces.` },
    {
        id: 2, title: 'React Native',
        content: `React Native: It is a framework developed 
                by Facebook for creating native-style apps 
                for iOS & Android.` },
    // Add more blog posts here
];

const App = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [posts, setPosts] = useState(data);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editPostId, setEditPostId] = useState(null);

    const addNewPost = () => {
        if (newPostTitle.trim() === '' ||
            newPostContent.trim() === '') {
            setError('Title and content cannot be empty');
            return;
        } else {
            setError('');
        }

        if (editMode) {
            const updatedPosts = posts.map(post => {
                if (post.id === editPostId) {
                    return {
                        id: editPostId,
                        title: newPostTitle,
                        content: newPostContent,
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            setEditMode(false);
            setEditPostId(null);
        } else {
            const id = posts.length + 1;
            const newPost = {
                id, title: newPostTitle,
                content: newPostContent
            };
            setPosts([...posts, newPost]);
        }
        setNewPostTitle('');
        setNewPostContent('');
    };

    const deletePost = (postId) => {
        const updatedPosts = posts.filter(
            (post) => post.id !== postId
        );
        setPosts(updatedPosts);
    };

    const editPost = (postId) => {
        const postToEdit = posts.find(post => post.id === postId);
        setNewPostTitle(postToEdit.title);
        setNewPostContent(postToEdit.content);
        setEditMode(true);
        setEditPostId(postId);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => setSelectedPost(item)}>
            <View style={styles.postContainer}>
                <Text style={styles.postTitle}>
                    {item.title}
                </Text>
                <Text style={styles.postContent}>
                    {item.content}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.deleteButton}
                        onPress={() => deletePost(item.id)}>
                        <Text style={styles.buttonText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton}
                        onPress={() => editPost(item.id)}>
                        <Text style={styles.buttonText}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Blog App</Text>
            </View>
            {!selectedPost ? (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                    <View style={styles.selectedPostContainer}>
                        <Text style={styles.selectedPostTitle}>
                            {selectedPost.title}
                        </Text>
                        <Text style={styles.selectedPostContent}>
                            {selectedPost.content}
                        </Text>
                        <TouchableOpacity style={styles.backButton}
                            onPress={() => setSelectedPost(null)}>
                            <Text style={styles.backButtonText}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            {selectedPost === null && (
                <View style={styles.formContainer}>
                    {error !== '' &&
                        <Text style={styles.errorText}>
                            {error}
                        </Text>}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Title"
                        value={newPostTitle}
                        onChangeText={setNewPostTitle}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Content"
                        value={newPostContent}
                        onChangeText={setNewPostContent}
                        multiline={true}
                    />
                    <Button title={editMode ? "Edit Post" : "Add New Post"}
                        onPress={() => addNewPost()} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    headingContainer: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    postContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    postContent: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    editButton: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    selectedPostContainer: {
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    selectedPostTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedPostContent: {
        fontSize: 16,
    },
    backButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    backButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    formContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default App;
