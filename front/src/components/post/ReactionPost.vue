<template>
    <button class="reaction-btn" :class="{ 'reaction-btn--active' : userIsIncluded }" type="button" @click="switchReaction" aria-label="Appliquer la reaction">
        <img class="reaction-btn__emoji" :src="require('@/assets/twemoji/svg/' + getUnicodeByIndex + '.svg')" alt="emoji">
        {{ getLength }}
    </button>
</template>

<script>
import {  mapState } from 'vuex';

export default {
    props : {
        reaction : { type : Object, required : true }
    },
    computed : {
        ...mapState('emojiModule',['emojisDataIndexed']),
        ...mapState('userModule',['user']),
        getUnicodeByIndex(){
            return this.reaction.emoji_unicode.split(' ').join('-').toLowerCase();
        },
        getLength(){
            return this.reaction.list_user_id.length;
        },
        userIsIncluded(){
            if(!this.user.id) return false;
            return this.reaction.list_user_id.includes(this.user.id.toString())
        }
    },
    methods : {

        /**
         * @name switchReaction
         * @description Switch la réaction (ajoute ou enleve) à un post
         */
        switchReaction(){ 
            if(this.userIsIncluded) this.remove()
            else this.add()
        },

        /**
         * @name remove
         * @description Supprime une réaction (emet l'evement pour)
         */
        remove(){ 
            const index = this.reaction.list_user_id.indexOf(this.user.id.toString());
            this.$emit('removeReaction', this.reaction.list_reaction_id[index], this.reaction.emoji_unicode)
        },

        /**
         * @name add
         * @description Emet l'evement pour ajouter une reaction
         */
        add(){ this.$emit('addReaction', this.reaction.emoji_unicode) }
    }


}
</script>

<style lang="scss">
    .reaction-btn{
        border-radius : 4px;

        border : 1px solid transparent;
        padding : 4px 8px;
        margin : 10px 4px 0 0;


        &--active{
            background-color : rgba(darken($primary, 25),0.4) !important;
            border : 1px solid rgba($primary, 0.6) !important;

            &:hover{
                background-color : rgba(darken($primary, 20),0.4) !important;
                border : 1px solid rgba($primary, 0.8) !important;
            }
        }

        &__emoji{
            @include setSize(16px);
        }

    }
</style>