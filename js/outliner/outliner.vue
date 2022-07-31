<template>
    <div>
        <h1>{{ "HELLO!" }}</h1>
    </div>
</template>

<script>
export default {
    name: 'Hello',
    data: function() {
        return {
            greeting: 'Hello'
        };
    },
    props: [],
    methods: {
    },
    created: function(){
    }
}
</script>

<style scoped>
h1 {
    font-size: 2em;
    text-align: center;
    background-color: red;
}
div {
    height: 60px;
    width: 60px;
    background-color: yellow;
}
</style>