<template>
  <Card>
    <CardHeader>
    <CardTitle><slot name="title"/></CardTitle>
    <CardDescription><slot name="description" /></CardDescription>
    </CardHeader>
    <CardContent><slot name="content" /></CardContent>
    <CardFooter class="self-end"><slot name="footer" /></CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>
