import router from "@/router"
// Import store if you are using reactive Store/Pinia/Vuex as User data source
import store from "@/stores"

// ----- VUE 3 Imports -----
import { computed } from "vue" // For VUE 3
import { createAcl, defineAclRules } from "vue-simple-acl"

// USER EXAMPLE 1: User {OBJECT}
const user = {
  id: 1,
  name: "Victory Osayi",
  is_editor: true,
  is_admin: false,
  // you can have role based permission list or access control list possibly from database
  permissions: ["admin", "owner", "moderator", "create-post", "edit-post", "delete-post"],
}

// USER EXAMPLE 2: User object from a {FUNCTION} or computed property like from Pinia/Vuex Store
// Suitable if you already has an existing logics authenticating and saving user data to Pinia/Vuex Store
const user2 = computed(() => store.state.auth.user)

// USER EXAMPLE 3; User object from an Asynchronous {FUNCTION} / {PROMISE}:
// Using Async/Promise requires instance of vue-router, the function will be auto hooked to beforeEach() peroperty of vue-router
const user3 = () => {
  const authUserId = 1 // ID of authenticated user
  // return axios.get(`api/users/${authUserId}`).then(response => response.data)
}

const rules = () =>
  defineAclRules((setRule) => {
    // setRule('unique-ability', callbackFunction(user, arg1, arg2, ...) { });
    // setRule(['unique-ability-1', 'unique-ability-2'], callbackFunction(user, arg1, arg2, ...) { });
    // Define a simple rule for ability with no argument
    setRule("create-post", (user) => user.is_admin || user.is_editor)
    setRule("is-admin", (user) => user.is_admin)
    setRule("is-editor", (user) => user.is_editor)
    // Define a simple rule for ability with an argument
    setRule("edit-post", (user, post) => user.id === post.user_id)
    setRule("delete-post", (user, post) => {
      return user.id === post.user_id || user.is_admin
    })
    // Define rule for array of multiple abilities that share same arguments and callback function
    setRule(["publish-post", "unpublish-post"], (user, post) => user.id === post.user_id)
    // Define rule for ability with multiple arguments
    setRule("hide-comment", (user, post, comment) => {
      return user.is_admin || user.id === post.user_id || (user.id === comment.user_id && post.id === comment.post_id)
    })
    setRule("moderator", (user) => user.permissions && user.permissions.includes("moderator"))
  })

const simpleAcl = createAcl({
  user, // short for user: user
  rules, // short for rules: rules
  router, // OPTIONAL, short for router: router
  // other optional vue-simple-acl options here... See Vue Simple ACL Options below
  onDeniedRoute: "/login",
})

export default simpleAcl
