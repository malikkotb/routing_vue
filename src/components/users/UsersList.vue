<template>
  <div>
    <button @click="confirmInput">Confirm</button>
    <button @click="saveChanges">Save Changes</button>
    <ul>
      <user-item
        v-for="user in users"
        :key="user.id"
        :name="user.fullName"
        :role="user.role"
      ></user-item>
    </ul>
  </div>
</template>

<script>
import UserItem from "./UserItem.vue";

export default {
  components: {
    UserItem,
  },
  inject: ["users"],
  data() {
    return {
      changesSaved: false,
    }
  },
  methods: {
    confirmInput() {
      // do something
      this.$router.push('/teams'); // add a new route to routing memory 
      // this.$router.back();
      // this.$router.forward();

    },
    saveChanges() {
      this.changesSaved = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('UsersList Cmp beforeRouteEnter')
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    // will be called b4 all the beforeEach and beforeEnter guards
    console.log('UsersList Cmp beforeRouteLeave');
    console.log(to, from);
    
    if (this.changesSaved) {
      next();
    } else {
      const userWantToLeave = confirm('Are you sure? You have unsaved changes.');
      next(userWantToLeave);
    }

  },
  unmounted() {
    console.log('unmounted');
  }

};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
