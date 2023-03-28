<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to team 2</router-link>
  </section>
</template>

<script>
import UserItem from "../users/UserItem.vue";

export default {
  inject: ["users", "teams"],
  props: ['teamId'],
  components: {
    UserItem,
  },
  data() {
    return {
      teamName: "",
      members: [],
    };
  },

  methods: {
    loadTeamMembers(teamId) {
      // $route gives access to various info:
      //like the path that was responsible for loading this page
      // this.$route.path // /teams/t1

      // another property: params property
      // holds all theroute parameters, that were used for getting to this page
      // in this case: one parameter -> (teamID)
      // everything that starts with a colon in the path is a route parameter
      
      // const teamId = route.params.teamId;
      
      // would need to do error checking here, for possibly non existing teamId
      
      const selectedTeam = this.teams.find((team) => team.id === teamId);
      const members = selectedTeam.members; // array full of ids of members
      const selectedMembers = [];

      // The "for of" loop, you iterate through the elements in the array.
      // In this case the elements are: u1, u2, u3
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }

      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },

  created() { // called when component is created, before its shown on the screen
    this.loadTeamMembers(this.teamId);
    console.log(this.$route.query);
  },
  beforeRouteUpdate(to, from, next) {
    console.log('TeamMembers Cmp beforeRouteUpdate');
    console.log(to, from);
    // this.loadTeamMembers(to.params.teamId);
    next();
  },  
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
