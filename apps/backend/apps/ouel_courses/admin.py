from django.contrib import admin
from apps.ouel_gemini.admin import admin_site
from .models import (
    Topic, Subject, Course, Section,
    Lesson, TheoryLesson, AssignmentLesson, Question, Choice,
    Resource, ResourceUser, ResourceLesson,
    Enrollment, LessonAttempt,
    Forum, ForumPost, Reply,
    CommentInteraction, LikeInteraction,
)


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2
    fields = ('content', 'is_correct')


class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1
    readonly_fields = ('created_date', 'updated_date')
    show_change_link = True


class SectionInline(admin.StackedInline):
    model = Section
    extra = 1
    fields = ('title', 'content')


class ResourceLessonInline(admin.TabularInline):
    model = ResourceLesson
    extra = 1
    autocomplete_fields = ('resource',)

class TopicAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class SubjectAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'level', 'created_date', 'updated_date')
    list_filter = ('level', 'subject')
    search_fields = ('name', 'description')
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('subject',)
    inlines = (SectionInline,)


class SectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'course')
    search_fields = ('title',)
    autocomplete_fields = ('course',)

class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'created_date', 'updated_date')
    search_fields = ('title',)
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('section',)
    inlines = (ResourceLessonInline,)


class TheoryLessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'minimum_time', 'created_date')
    search_fields = ('title',)
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('section',)


class AssignmentLessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'assignment_type', 'score', 'max_attempts', 'strict_mode')
    list_filter = ('assignment_type', 'strict_mode')
    search_fields = ('title',)
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('section',)
    inlines = (QuestionInline,)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('content', 'assignment', 'created_date')
    search_fields = ('content',)
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('assignment',)
    inlines = (ChoiceInline,)


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('content', 'question', 'is_correct')
    list_filter = ('is_correct',)
    search_fields = ('content',)
    autocomplete_fields = ('question',)

class ResourceAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_date', 'updated_date')
    search_fields = ('name',)
    readonly_fields = ('created_date', 'updated_date')


class ResourceUserAdmin(admin.ModelAdmin):
    list_display = ('user', 'resource', 'counter', 'last_interaction')
    search_fields = ('user__username', 'resource__name')
    readonly_fields = ('last_interaction',)
    raw_id_fields = ('user',)
    autocomplete_fields = ('resource',)


class ResourceLessonAdmin(admin.ModelAdmin):
    list_display = ('resource', 'lesson')
    autocomplete_fields = ('resource', 'lesson')

class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'percentage_completed', 'is_completed', 'enrolled_at')
    list_filter = ('is_completed', 'course')
    search_fields = ('user__username', 'course__name')
    readonly_fields = ('enrolled_at',)
    raw_id_fields = ('user',)
    autocomplete_fields = ('course',)


class LessonAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'score', 'is_completed', 'is_passed', 'attempt_time')
    list_filter = ('is_completed', 'is_passed')
    search_fields = ('user__username', 'lesson__title')
    readonly_fields = ('attempt_time', 'user_answers')
    raw_id_fields = ('user',)
    autocomplete_fields = ('lesson',)


class ForumAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_date', 'updated_date')
    search_fields = ('title',)
    readonly_fields = ('created_date', 'updated_date')
    autocomplete_fields = ('course',)



class ForumPostAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'forum', 'created_date', 'updated_date')
    search_fields = ('name', 'user__username', 'content')
    readonly_fields = ('created_date', 'updated_date')
    raw_id_fields = ('user',)
    autocomplete_fields = ('forum',)


class ReplyAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'post', 'created_date', 'updated_date')
    search_fields = ('name', 'user__username', 'content')
    readonly_fields = ('created_date', 'updated_date')
    raw_id_fields = ('user',)
    autocomplete_fields = ('post',)


class CommentInteractionAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'lesson', 'timestamp')
    search_fields = ('user__username', 'comment')
    readonly_fields = ('timestamp',)
    raw_id_fields = ('user',)
    autocomplete_fields = ('course', 'lesson')

class LikeInteractionAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'lesson', 'timestamp')
    search_fields = ('user__username',)
    readonly_fields = ('timestamp',)
    raw_id_fields = ('user',)
    autocomplete_fields = ('course', 'lesson')

admin_site.register(Topic, TopicAdmin)
admin_site.register(Subject, SubjectAdmin)
admin_site.register(Course, CourseAdmin)
admin_site.register(Section, SectionAdmin)
admin_site.register(Lesson, LessonAdmin)
admin_site.register(TheoryLesson, TheoryLessonAdmin)
admin_site.register(AssignmentLesson, AssignmentLessonAdmin)
admin_site.register(Question, QuestionAdmin)
admin_site.register(Choice, ChoiceAdmin)
admin_site.register(Resource, ResourceAdmin)
admin_site.register(ResourceUser, ResourceUserAdmin)
admin_site.register(ResourceLesson, ResourceLessonAdmin)
admin_site.register(Enrollment, EnrollmentAdmin)
admin_site.register(LessonAttempt, LessonAttemptAdmin)
admin_site.register(Forum, ForumAdmin)
admin_site.register(ForumPost, ForumPostAdmin)
admin_site.register(Reply, ReplyAdmin)
admin_site.register(CommentInteraction, CommentInteractionAdmin)
admin_site.register(LikeInteraction, LikeInteractionAdmin)
