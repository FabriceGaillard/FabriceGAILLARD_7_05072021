<template>
    <button class="btn-default"><slot></slot></button>
</template>

<style lang="scss">
    .btn-default {
        font-size: 13px;
        @include setCircularStdFont("Bold");
        padding: 15px;
        border-radius: $border-radius;

        &--green {
            background-color: darken($primary,5%);
            &:hover{
                background-color: $primary;

                text-decoration: none !important;
            }
        }

        &--sm{
            padding : 8px;
        }

        &:hover{
            text-decoration: underline;
        }
    }
</style>
