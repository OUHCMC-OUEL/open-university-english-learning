from django.contrib import admin
from config.admin import admin_site
from .models import Tag, TagExam, TagLevel, TagPart,  Exam, Part, Question, PartHistory, UserAnswer

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1
    fields = ['question_text', 'correct_answer', 'explanation']

class PartInline(admin.StackedInline):
    model = Part
    extra = 0

class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_date']
    search_fields = ['name']
    list_filter = ['created_date']

class ExamAdmin(admin.ModelAdmin):
    list_display = ['name', 'time', 'get_levels', 'created_date']
    search_fields = ['name', 'description']
    list_filter = ['tag_levels', 'tag_exams']
    inlines = [PartInline]

    def get_levels(self, obj):
        return ", ".join([t.name for t in obj.tag_levels.all()])
    get_levels.short_description = 'Levels'

class PartAdmin(admin.ModelAdmin):
    list_display = ['name', 'exam', 'type_part', 'tag_parts', 'created_date']
    list_filter = ['type_part', 'exam', 'tag_parts']
    search_fields = ['name', 'content']
    inlines = (QuestionInline,)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'part', 'correct_answer']
    list_filter = ['correct_answer', 'part__exam', 'part']
    search_fields = ['question_text', 'explanation']

class PartHistoryAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'part', 'score', 'correct_answers', 'total_answers', 'created_date']
    list_filter = ['part', 'created_date']
    readonly_fields = ['created_date', 'updated_date']

class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ['id', 'part_history', 'question', 'user_answer', 'is_correct']
    list_filter = ['is_correct']

admin_site.register(TagPart)
admin_site.register(TagExam)
admin_site.register(TagLevel)
admin_site.register(Tag, TagAdmin)
admin_site.register(Exam, ExamAdmin)
admin_site.register(Part, PartAdmin)
admin_site.register(Question, QuestionAdmin)
admin_site.register(PartHistory, PartHistoryAdmin)
admin_site.register(UserAnswer, UserAnswerAdmin)
