<template>
    <div type="button" class="display-settings-panel" ref="display-settings-create-panel"   @mousedown="close">
        <form  @mousedown.stop>
            <div class="create-panel">
                <button class="create-panel__close-btn" type='button' @click="close" aria-label="Fermer">
                    <svg  width="24" height="24" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                        ></path>
                    </svg>                
                </button>
                <header class="create-panel__header">
                    <h2 class="create-panel__title">Créer un channel</h2>
                    <p class="create-panel__description">dans {{ activeGroupChannel.name }}</p>
                </header>

                <div class="create-panel__main">
                    <label class="create-panel__label" for="name">NOM DU CHANNEL</label>
                    <InputDefaultIcon
                        :type="'text'"
                        :id="'name'"
                        :name="''"
                        :placeholder="'nouveau channel'"
                        :label="'NOM DU CHANNEL'"
                        v-model="input"
                        ref="InputDefaultIcon"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                            ></path>
                        </svg>
                    </InputDefaultIcon>
                    <p>
                        Le nom d'un channel ne peut être composer que de caractères alphanumériques
                    </p>
                </div>

                <footer class="create-panel__footer">
                    <BtnDefault type="button" @click.stop="close">Annuler</BtnDefault>
                    <BtnDefault type="submit" class="btn-default--green create-panel__btn" 
                        @click.prevent="create">
                        Créer un channel
                    </BtnDefault>
                </footer>                    
            </div>
        </form>            
    </div>
</template>

<script>
import BtnDefault from "@/components/btn/BtnDefault.vue";
import InputDefaultIcon from "@/components/form/input/inputDefaultIcon.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import FocusHandler from "@/js/FocusHandler.js";

export default {
    components: { BtnDefault, InputDefaultIcon },
    data() {
        return {
            input: '',
        };
    },
    computed : {
        ...mapState('createChannelDisplay',['activeGroupChannel']),
    },
    methods:{
        ...mapMutations('createChannelDisplay',['CLOSE']),
        ...mapActions('sidebarModule',['createChannel']),
        /**
         * @name handleFocus
         * @description Initialise le gestionnaire du focus pour l'element cible
         */
        handleFocus() {
            this.focusHandler = new FocusHandler(this.$refs["display-settings-create-panel"]);
            this.focusHandler.setEvent();
        },

        /**
         * @name close
         * @description Ferme le display
         */
        close(){
            this.input = '';
            this.CLOSE();
        },

        /**
         * @name create
         * @description Crée une nouveau channel
         */
        create(){
            if(this.input != '' && this.input != null){
                this.createChannel({ name : this.input, description : null, channelGroupId : this.activeGroupChannel.id });
                this.close();
            }
        },
    },
    mounted() {
        this.handleFocus();
    },
    unmounted() {
        this.focusHandler.removeEvent();
    },
};
</script>

<style lang="scss">
.display-settings-panel {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.7);
    overflow: auto;
}

.create-panel {
    position: absolute;
    left: 50%;
    top: 50%;
    color : white;
    transform: translate(-50%, -50%);
    border-radius: $border-radius;
    background-color: $grey-32;
    width: 441px;

    &__close-btn{
        padding : 15px;
        color : grey;
        position : absolute;
        right : 0;
        top : 0;
        transition : transform 0.1s;
        transform : rotate(0deg);
        &:hover{
            transform : rotate(90deg);
            color : lighten(grey, 8%)
        }
    }

    &__header,
    &__main {
        padding: 34px 18px 0 18px;
    }

    &__header {
        text-align: center;

        &--left{
            text-align: unset;
            padding: 20px 20px 0 20px;
        }
    }

    &__main {
        color: $grey-215;
        padding: 18px;
    }

    &__title {
        @include setCircularStdFont("Black");
        margin: 0 0 6px 0;
        font-size: 25px;
    }

    &__description {
        font-size: 12px;
        color: $grey-166;
        margin: 0;
    }

    &__label {
        @include setCircularStdFont("Bold");
        display: block;
        margin: 10px 0;
        font-size: 13px;
    }

    &__btn {
        margin-left: 20px;
    }

    &__footer {
        background-color: $grey-25;
        padding: 18px;
        text-align: right;
    }
}
</style>
