<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>card-basic</v-card-title>
        <v-card-text>
          <card-basic></card-basic>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>card-navigation</v-card-title>
        <v-card-text>
          <card-navigation></card-navigation>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>card-solid</v-card-title>
        <v-card-text>
          <card-solid></card-solid>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CardBasic from "@/views/card/card-basic/CardBasic"
import CardNavigation from "@/views/card/card-basic/CardNavigation"
import CardSolid from "@/views/card/card-basic/CardSolid"
export default {
  name: "CardView",
  components: { CardSolid, CardNavigation, CardBasic },
}
</script>

<style scoped></style>
