<template>
    <div
        class="container-full l-config"
        role="dialog"
        ref="configuration_channel"
        aria-labelledby="configuration_channel"
        aria-modal="true"
    >
        <div class="scroll-y">
            <div class="container">
                <div
                    class="sidebar config-sidebar"
                    :class="{ 'sidebar--active': sidebar.visible }"
                    @click="switchSidebarVisibility"
                >
                    <div class="sidebar__container config-sidebar__container" @click.stop="">
                        <button type="button" class="l-config__close-btn list-close-btn" @click="switchSidebarVisibility" aria-label="fermer la barre laterale">
                            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                                ></path>
                            </svg>
                        </button>

                        <div class="sidebar__content config-sidebar__content">
                            <div class="config-sidebar__group">
                                <span class="config-sidebar__group-title">
                                    <svg height="12px" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                        ></path>
                                    </svg>
                                    {{ activeChannel.name }}
                                </span>
                                <span class="config-sidebar__group-categorie">
                                    Channel
                                </span>
                            </div>

                            <ul class="config-sidebar__list">
                                <li class="config-sidebar__list-item">
                                    <router-link to="" class="link-btn link-btn--active">Vue d'ensemble</router-link>
                                </li>
                            </ul>

                            <hr />

                            <button
                                type="button"
                                class="link-btn link-btn--danger config-sidebar__btn"
                                @click.stop="removeChannel"
                            >
                                Supprimer le channel
                            </button>
                        </div>
                    </div>
                </div>

                <div class="main l-config__main">
                    <button type="button" class="l-config__show-list-btn" @click="switchSidebarVisibility" aria-label="Ouvrir le menu du panneau de configuration">
                        <svg
                            class="show-list-btn__icon"
                            :class="{ 'show-list-btn__icon--visible': sidebar.visible }"
                            height="18"
                            width="18"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="m5.41667 4.2625 5.66573 5.7375-5.66573 5.7375 1.74426 1.7625 7.42237-7.5-7.42237-7.5z"
                                fill="currentcolor"
                                fill-rule="evenodd"
                            ></path>
                        </svg>
                    </button>

                    <button type="button" class="l-config__close-btn" @click="CLOSE_CONFIG" aria-label="Fermer le panneau de configuration">
                        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
                            ></path>
                        </svg>
                    </button>

                    <span class="tag-content">CHANNEL</span>
                    <h2 class="l-config__title">Configuration du Channel</h2>

                    <form class="form-channel" action="" @mousedown.stop>
                        <label class="create-panel__label" for="name">NOM DU CHANNEL</label>
                        <InputDefaultIcon
                            :type="'text'"
                            :id="'name'"
                            :name="''"
                            :placeholder="'nouveau channel'"
                            :label="'NOM DU CHANNEL'"
                            :focus="true"
                            v-model="name"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                                ></path>
                            </svg>
                        </InputDefaultIcon>

                        <label class="create-panel__label" for="name">DESCRIPTION DU CHANNEL</label>
                        <TextareaCounter
                            :name="''"
                            :id="''"
                            :rows="10"
                            :maxLength="255"
                            :className="'input-default input-default--colorA'"
                            v-model="description"
                            :placeholder="'Apprend à tous le monde comment utiliser ce channel !'"
                        />

                        <BtnDefault
                            type="submit"
                            class="form-channel__submit btn-default--green create-panel__btn"
                            @click.prevent="modify({ name, description })"
                            >Valider</BtnDefault
                        >
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputDefaultIcon from "@/components/form/input/inputDefaultIcon.vue";
import BtnDefault from "@/components/btn/BtnDefault.vue";
import TextareaCounter from "@/components/form/input/TextareaCounter.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import FocusHandler from "@/js/FocusHandler.js";
export default {
    components: { InputDefaultIcon, BtnDefault, TextareaCounter },
    data() {
        return {
            name: null,
            description: null,
            sidebar: {
                visible: false,
            },
            focusHandler : null
        };
    },
    computed: {
        ...mapState("configChannelModule", ["visible", "activeChannel"]),
    },
    methods: {
        ...mapMutations("configChannelModule", ["CLOSE_CONFIG"]),
        ...mapActions("configChannelModule", ["modify", "remove"]),
        ...mapState('imagePostModule',['listFile']),

        /**
         * @name switchSidebarVisibility
         * @description Switch la visibilité du display configChannel
         */
        switchSidebarVisibility() {
            this.sidebar.visible = !this.sidebar.visible;
        },

        /**
         * @name removeChannel
         * @description Supprime le channel
         */
        async removeChannel() {
            await this.remove();
            if (this.activeChannel.id == this.$route.params.id) this.$router.push({ name: "Home" });
        },

        /**
         * @name handleFocus
         * @description Initialise la gestion du focus
         */
        handleFocus() {
            this.focusHandler = new FocusHandler(this.$refs["configuration_channel"]);
            this.focusHandler.setEvent();
        },
    },
    created() {
        this.name = this.activeChannel.name;
        this.description = this.activeChannel.description;
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
.l-config {
    position: absolute;
    z-index: 7;
    width: 100%;
    background: $grey-25;
    background: linear-gradient(90deg, $grey-25 0%, $grey-25 50%, $grey-32 51%, $grey-32 100%);
    padding: 0 !important;

    textarea {
        resize: none;
        @include setScrollBar($primary);
    }

    .scroll-y{
        height : 100vh;
    }

    &__main {
        position: relative;
        padding: 100px 30px 30px 30px;
        display: block !important;
        min-height: 100vh !important;
        background-color: $grey-32 !important;

        @include setMediaScreen(tablette) {
            padding: 100px 5px 5px 5px;
        }
    }

    &__close-btn,
    &__show-list-btn {
        position: absolute;
        @include setCircle(36px);
        border: 2px solid grey;
        @include setFlexCenter();
        &:hover {
            background-color: rgba(white, 0.1);
        }
    }

    &__close-btn {
        right: 0px;
    }

    &__show-list-btn {
        left: 5px;
        top: 20px;
        display: none;

        @include setMediaScreen(tablette) {
            display: block;
        }
    }

    &__title {
        color: white;
        font-size: 48px;
        @include setCircularStdFont("Black");
        letter-spacing: -2.7px;
        margin: 4px 0 30px 0;
    }
}
.config-sidebar {
    top: 0 !important;

    &__btn {
        text-align: left;
    }

    @include setMediaScreen(tablette) {
        padding: 0px !important;
    }

    &__container {
        background-color: $grey-25 !important;
    }

    &__content {
        background-color: inherit !important;
        padding: 80px 10px 0 10px !important;
        padding: 31px 0;
        width: 100%;
    }

    &__group {
        display: flex;
        color: $grey-166;
        font-size: 12px;
        padding: 0 0 10px 0;
    }

    &__group-title {
        @include setCircularStdFont("Black");
        @include textEllipsis();
        text-transform: uppercase;
    }

    hr {
        border: 1px solid $grey-32;
    }
}

.form-channel {
    &__submit {
        margin-left: auto;
        display: block;
    }

    input,
    textarea {
        margin-bottom: 40px;
    }
}

.link-btn {
    padding: 8px 10px;
    border-radius: 4px;
    color: $grey-166;
    width: 100%;
    display: block;
    cursor: pointer;

    &:hover,
    &--active {
        color: white !important;
        text-decoration: none;
        background-color: $grey-32;
    }
    &:visited {
        color: $grey-166;
    }

    $link-btn-colors: (
        danger: $danger,
        info: $info,
    );

    @each $name, $color in $link-btn-colors {
        &--#{$name} {
            color: $color;
            &:hover {
                color: white;
                background-color: $color;
            }
            &:visited {
                color: $color;
            }
        }
    }
}

.list-close-btn {
    right: 10px;
    width: 25px;
    top: 70px;
    height: 25px;
    display: none;
    @include setMediaScreen(tablette) {
        display: flex;
    }
}
</style>
