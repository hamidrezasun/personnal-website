<template>
    <div>
    {{ id }}
    </div>
</template>

<script>
export default{
    data(){
        return{
            id:0
        }
    },
    validate ({ params }) {
        // Must be a number
        this.id = params.id;
        console.log(this.id)
        return /^\d+$/.test(params.id)
    }
}
</script>